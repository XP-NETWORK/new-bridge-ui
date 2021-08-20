import { getBalance, listNft, tokenBalances } from './actions';
import { NftPacked } from "validator/dist/encoding";
import { chains, coins, exchangeRates } from './config';
import { PredefinedAccounts } from './cross_chain/accounts';
import { balanceAllTokens, ChainFactory, txnSocket } from './cross_chain';
import {remoteNFTMeta} from './singletons';
import { ExplorerPrefix } from './cross_chain/config';
import { CHAIN_BY_NONCE } from './cross_chain/consts';
import { Base64 } from 'js-base64';

const callFromInner = async (chain, func, ...args) => {
    const helper = ChainFactory[chain];
    const inner = await helper.inner();

    return await inner[func](...args);
}

const waitUrl = async (target_nonce, id) => {
    const hash = await txnSocket.waitTxHash(target_nonce, id.toString());

    return `${ExplorerPrefix[CHAIN_BY_NONCE[target_nonce]]}/${hash}`;
}

const callFromInnerSigned = async (chain, func, signer_, chain_nonce, ...args) => {
    const helper = ChainFactory[chain];
    const inner = await helper.inner();
    const signer = await helper.signerFromPk(signer_);

    const [, id] = await inner[func](signer, chain_nonce, ...args);
    return await waitUrl(chain_nonce, id);
}

export const getBalanceThunk = (chain, address) => async dispatch => {

    try {
        const balance = await callFromInner(chain, 'balance', PredefinedAccounts[chain][address].account);
        dispatch(getBalance(balance['c'][0] / 10 ** (balance['e'] - 14)));

    } catch (error) {
        console.error(error);
    }
}

export const getWrappedTokensBalances = (chain, address) => async dispatch => {
    try {
        const helper = ChainFactory[chain];
        const balances = await balanceAllTokens(
            helper,
            PredefinedAccounts[chain][address].account
        )
        dispatch(tokenBalances(balances));

        balances.forEach(item => {
            console.log(item[1].toString())
        })
        
    } catch (error) {
        console.error(error);
    }
}


/**
 * Sending native tokens to a foreign ledger
 * @param {*} chain 
 * @param {*} signer 
 * @param {*} nonce 
 * @param {*} to 
 * @param {*} value 
 * @returns Transaction and the Identifier of this action to track the status
 */
export const sendTokens = (chain, signer_, nonce, to, value) => async dispatch => {
    try {
        const result = callFromInnerSigned(chain, 'transferNativeToForeign', signer_, nonce, to, value);
        result.then(data => {
            console.log(data, typeof data)
            showAlert(data)
            });

    } catch (error) {
        console.error(error);
    }
}

/**
 * Sending foreign wrapped tokens to a foreign ledger
 * @param {*} chain 
 * @param {*} signer 
 * @param {*} nonce 
 * @param {*} to 
 * @param {*} value 
 * @returns Transaction and the Identifier of this action to track the status
 */
export const returnWrappedTokens = (chain, signer_, nonce, to, value) => async dispatch => {
    try {
        const result = callFromInnerSigned(chain, 'unfreezeWrapped', signer_, nonce, to, value);
        result.then(data => {
            showAlert(data)
            });

    } catch (error) {
        console.error(error);
    }
}

/**
 * Sending Native NFTs to a foreign ledger
 * @param {*} chain the source chain
 * @param {*} sender the owner account able to sign a TX
 * @param {*} chain_nonce nonce of the target chain
 * @param {*} to the target address in the target ledger
 * @param {*} id nft id
 * @returns Transaction and the Identifier of this action to track the status
 */
export const sendNFTNative = (chain,sender_, chain_nonce, to, id) => async dispatch => {
    try {
        const result = callFromInnerSigned(chain, 'transferNftToForeign', sender_, chain_nonce, to, id);
        result.then(data => {
            showAlert(data)
        });

    } catch (error) {
        console.error(error);
    }
}

/**
 * Returns a foreign (wrapped) NFT
 * @param {*} chain the original chain
 * @param {*} sender the owner who can sign the TX
 * @param {*} to the target address
 * @param {*} id the ID of the NFT
 * @returns Transaction and the Identifier of this action to track the status
 */
export const sendNFTForeign = (chain,sender_, chain_nonce, to, id) => async dispatch => {
    try {
        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        const sender = await helper.signerFromPk(sender_);
    
        const [, aid] = await inner.unfreezeWrappedNft(sender, to, id);
        const result = waitUrl(chain_nonce, aid);
        result.then(data => {
            showAlert(data)
        });

    } catch(e) {
        console.error(e);
    }
}

const decoder = new TextDecoder();

const listNFTNativeChains = async (chain, owner, dbList) => {
    const resM = Object.fromEntries(dbList.map((obj) => [obj.id, obj]));
    const final = [];
    const helper = ChainFactory[chain];
    let owned = Array.from(await callFromInner(chain, 'listNft', owner));

    let idGetter;
    switch (chain) {
        case "XP.network": {
            idGetter = async (ident, data) => {
                const datStr = decoder.decode(data);
                if (datStr.length !== 24 || datStr.includes("\uFFFD")) {
                    const packed = NftPacked.deserializeBinary(Uint8Array.from(data));
                    const rawDat = packed.getData_asU8();
                    const dat = helper.tryDecodeWrappedPolkadotNft(rawDat);
                    const orig = await callFromInner('Elrond', 'getLockedNft', dat);
                    return { id: window.atob(orig.uris[0]), isWrapped: true, info: ident, originChain: "Elrond" };
                } else {
                    return { id: datStr, isWrapped: false, info: ident, originChain: chain };
                }
            }
            break;
        }
        case "Elrond": {
            idGetter = async (ident, data) => {
                const parts = ident.split("-");
                const nonce = parseInt(parts.pop(), 16);
                const token = parts.join("-");
                if (await helper.isWrappedNft("", token)) {
                    const hash = Base64.toUint8Array(data.uris[0]);
                    const dat = await callFromInner('XP.network', 'getLockedNft', hash);
                    return { id: decoder.decode(dat.slice(-24)), isWrapped: true, info: data.nonce, originChain: "XP.network" };
                } else {
                    return {
                        id: window.atob(data.uris[0]),
                        isWrapped: false,
                        info: { nonce, token },
                        originChain: chain
                    }
                }
            }
            break;
        }
        default: {
            throw Error(`Unhandled chain ${chain}`);
        }
    }

    for (const [ident, data] of owned) {
        const { id, isWrapped, info, originChain } = await idGetter(ident, data);
        if (resM[id]  === undefined) {
            continue;
        }
        resM[id].originChain = originChain;
        resM[id].isWrapped = isWrapped;
        resM[id].hash = info;

        final.push(resM[id]);
    }

    return final;
}

/**
 * Retrievs a list of all NFTs owned by an address
 * @param {*} chain the chain of origin
 * @param {*} owner the owner's address
 * @returns Transaction and the Identifier of this action to track the status
 */
export const listNFTs = (chain,owner) => async dispatch => {
    try {
        const dbList = await remoteNFTMeta.getAll();
        const nfts = await listNFTNativeChains(chain, owner, dbList);
        dispatch(listNft(nfts));

    } catch (error) {
        console.error(error);
        dispatch(listNft([]));
    }
}


/**
 * Unified way of displaying a link
 * @param {string} message 
 */
const showAlert = message => {
    alert(message)
}

