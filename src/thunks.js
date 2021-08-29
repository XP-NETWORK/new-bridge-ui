import { getBalance, listNft, tokenBalances, showLoader, nftLoader, setModalMessage } from './actions';
import { NewElrondAccounts, PredefinedAccounts, Web3Accounts } from './cross_chain/accounts';
import { balanceAllTokens, ChainFactory, txnSocket } from './cross_chain';
import {remoteNFTMeta} from './singletons';
import { ChainConfig, ExplorerPrefix } from './config';
import { CHAIN_BY_NONCE } from './cross_chain/consts';
import { BigNumber as EthBN } from "ethers";

const callFromInner = async (chain, func, ...args) => {
    const helper = ChainFactory[chain];
    const inner = await helper.inner();

    return await inner[func](...args);
}

const explorerUrl = (target_nonce, hash) => `${ExplorerPrefix[CHAIN_BY_NONCE[target_nonce]]}/${hash}`;

const callFromInnerSigned = async (chain, func, signer_, chain_nonce, ...args) => {
    const helper = ChainFactory[chain];
    const inner = await helper.inner();
    const signer = await helper.signerFromPk(signer_);

    const [, id] = await inner[func](signer, chain_nonce, ...args);
    return await txnSocket.waitTxHash(chain_nonce, id.toString());
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
            dispatch(showAlert(explorerUrl(nonce, data)))
            });

    } catch (error) {
        dispatch(showLoader(false))
        console.log('sendTokens')
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
        let user = signer_ === '//Alice//stash' ? 'Alice_Stash' : signer_ === '//Bob//stash' ? 'Bob_Stash' : signer_.replace('//', '')
        if(user.length > 20) {
            user = Object.keys(NewElrondAccounts).filter(n => NewElrondAccounts[n].key === signer_)[0]
        }
        const result = callFromInnerSigned(chain, 'unfreezeWrapped', signer_, nonce, to, value);
        result.then(data => {
            if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
            dispatch(showAlert(explorerUrl(nonce, data)))
            }).catch(er => {
                if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
                dispatch(showLoader(false))
            })

    } catch (error) {
        dispatch(showLoader(false))
        console.log('returnWrappedTokens')
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
export const sendNFTNative = (chain,sender_, chain_nonce, to, nft) => async dispatch => {
    try {
        let user = Object.keys(NewElrondAccounts).filter(n => NewElrondAccounts[n].key === sender_)[0]
        if(!PredefinedAccounts[chain][user]) user = sender_ === '//Alice//stash' ? 'Alice_Stash' : sender_ === '//Bob//stash' ? 'Bob_Stash' : sender_.replace('//', '')
        if(!PredefinedAccounts[chain][user]) user = Object.keys(Web3Accounts).filter(n => Web3Accounts[n].key === sender_)[0]
        let err;
        const data = await callFromInnerSigned(chain, 'transferNftToForeign', sender_, chain_nonce, to, nft.hash).catch(er => {
            err = er;
            if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
            dispatch(showLoader(false))
        });
        if (err) {
            return;
        }

        if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
        dispatch(showAlert(explorerUrl(chain_nonce, data)))
    } catch (error) {
        dispatch(showLoader(false))
        console.log('sendNFTNative')
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
export const sendNFTForeign = (chain,sender_, chain_nonce, to, nft) => async dispatch => {
    try {
        let user = Object.keys(NewElrondAccounts).filter(n => NewElrondAccounts[n].key === sender_)[0]
        if(!PredefinedAccounts[chain][user]) user = sender_ === '//Alice//stash' ? 'Alice_Stash' : sender_ === '//Bob//stash' ? 'Bob_Stash' : sender_.replace('//', '')
        if(!PredefinedAccounts[chain][user]) user = Object.keys(Web3Accounts).filter(n => Web3Accounts[n].key === sender_)[0]

        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        const sender = await helper.signerFromPk(sender_);
        const [, aid] = await inner.unfreezeWrappedNft(sender, to, nft.hash);
        let err;
        const data = await txnSocket.waitTxHash(chain_nonce, aid).catch(er => {
            err = er;
            if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
            dispatch(showLoader(false))
        });
        if (err) {
            return;
        }

        if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
        dispatch(showAlert(explorerUrl(chain_nonce, data)))
    } catch(e) {
        let user = Object.keys(NewElrondAccounts).filter(n => NewElrondAccounts[n].key === sender_)[0]
        if(!PredefinedAccounts[chain][user]) user = sender_ === '//Alice//stash' ? 'Alice_Stash' : sender_ === '//Bob//stash' ? 'Bob_Stash' : sender_.replace('//', '')
        if(PredefinedAccounts[chain] && PredefinedAccounts[chain][user]) dispatch(listNFTs(chain, PredefinedAccounts[chain][user].account))
        dispatch(showLoader(false))
        console.error(e);
    }
}

const decoder = new TextDecoder();

const getWrappedNft = async (source_chain_helper, identifier, nft_data) => {
    const source_inner = await source_chain_helper.inner();
    const native_data = await source_inner.decodeWrappedNft(nft_data)
    const foreign_helper = ChainFactory[CHAIN_BY_NONCE[native_data.chain_nonce]];
    const foreign_inner = await foreign_helper.inner();

    return {
        id: await foreign_inner.decodeUrlFromRaw(native_data.data),
        isWrapped: true,
        hash: identifier,
        originChain: CHAIN_BY_NONCE[native_data.chain_nonce],
    }
}

const getOwnedNative = async (chain_helper, owner, dbList) => {
    const inner = await chain_helper.inner();
    if (inner.listNft) {
        return Array.from(await inner.listNft(owner));
    }
    // Web3 chain, use dbList
    return await Promise.all(dbList.filter(({data}) => {
        const attrs = data.split(",");
        return attrs[0] === chain_helper.ident && attrs[2].toLowerCase() === owner.toLowerCase();
    }).map(async ({ data }) => {
        const attrs = data.split(",");
        const ident = {
            contract_type: "ERC1155",
            contract: attrs[1],
            token: EthBN.from(attrs[3]),
        };
        const id = await inner.nftUri(ident);

        return [ident, id];
    }));
}

const listNFTNativeChains = async (chain, owner, dbList) => {
    const resM = Object.fromEntries(dbList.map((obj) => [obj.id, obj]));
    const final = [];
    const helper = ChainFactory[chain];
    let owned = await getOwnedNative(helper, owner, dbList);
    let idGetter;
    switch (chain) {
        case "XP.network": {
            idGetter = async (ident, data) => {
                const datStr = decoder.decode(data);
                if (datStr.length !== 24 || datStr.includes("\uFFFD")) {
                    return await getWrappedNft(helper, ident, data);
                } else {
                    return { id: datStr, isWrapped: false, hash: ident, originChain: chain };
                }
            }
            break;
        }
        case "Elrond": {
            idGetter = async (ident, data) => {
                const parts = ident.split("-");
                const nonce = parseInt(parts.pop(), 16);
                const token = parts.join("-");
                if (await helper.isWrappedNft(owner, token)) {
                    return await getWrappedNft(helper, nonce, data);
                } else {
                    return {
                        id: window.atob(data.uris[0]),
                        isWrapped: false,
                        hash: { nonce, token },
                        originChain: chain
                    }
                }
            }
            break;
        }
        case "Ropsten":
        case "BSC":
        case "HECO": {
            idGetter = async (ident, data) => {
                if (ident.contract === ChainConfig.web3_erc1155[chain]) {
                    return await getWrappedNft(helper, ident.token, data);
                } else {
                    return {
                        id: data,
                        isWrapped: false,
                        hash: ident,
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
        let res;
        try {
            res = await idGetter(ident, data);
        } catch (e) {
            console.log(e);
            continue;
        }
        const { id, isWrapped, hash, originChain } = res;
        if (resM[id]  === undefined) {
            continue;
        }
        resM[id].originChain = originChain;
        resM[id].isWrapped = isWrapped;
        resM[id].hash = hash;

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
export const listNFTs = (chain, owner) => async dispatch => {
    try {
        dispatch(nftLoader(true))
        const dbList = await remoteNFTMeta.getAll();
        const nfts = await listNFTNativeChains(chain, owner, dbList);
        dispatch(listNft(nfts));

    } catch (error) {
        console.error(error);
        dispatch(listNft([]));
    }
    dispatch(nftLoader(false))

}


/**
 * Unified way of displaying a link
 * @param {string} message 
 */
const showAlert = message => async dispatch => {
    dispatch(showLoader(false));
    // alert(message);
    // toast(message)
    dispatch(setModalMessage(message))
}

