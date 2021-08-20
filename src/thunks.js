import { getBalance, listNfts, tokenBalances } from './actions';
import { chains, coins, exchangeRates } from './config';
import { PredefinedAccounts } from './cross_chain/accounts';
import { ChainFactory, balanceOfWrappedTokens, txnSocket } from './cross_chain';
import {localNFTMeta} from './singletons';
import { ExplorerPrefix } from './cross_chain/config';
import { CHAIN_BY_NONCE } from './cross_chain/consts';

const callFromInner = async (chain, func, ...args) => {
    const helper = ChainFactory[chain];
    const inner = await helper.inner();

    return await inner[func](...args);
}

const waitUrl = async (target_nonce, id) => {
    console.log("CALLEDME");
    const hash = await txnSocket.waitTxHash(target_nonce, id);
    console.log("DONE");

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
        const balances = await balanceOfWrappedTokens(
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
        const result = callFromInnerSigned(chain, 'unfreezeWrappedNft', sender_, chain_nonce, to, id);
        result.then(data => {
            showAlert(data)
        });

    } catch (error) {
        console.error(error);
    }
}

/**
 * Retrievs a list of all NFTs owned by an address
 * @param {*} chain the chain of origin
 * @param {*} owner the owner's address
 * @returns Transaction and the Identifier of this action to track the status
 */
export const listNFTs = (chain,owner) => async dispatch => {
    try {

        const _nfts = await localNFTMeta.getAll();
        dispatch(listNfts(_nfts));

    } catch (error) {
        console.error(error);
        dispatch(listNfts([]));
    }
}


/**
 * Unified way of displaying a link
 * @param {string} message 
 */
const showAlert = message => {
    alert(message)
}

