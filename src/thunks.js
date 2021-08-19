import { getBalance } from './actions';
import { chains, coins, exchangeRates } from './config';
import { PredefinedAccounts } from './cross_chain/accounts';
import { ChainFactory } from './cross_chain';

export const getBalanceThunk = (chain, address) => async dispatch => {

    try {
        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        console.log(chain, address, helper, inner)
        const balance = await inner.balance(PredefinedAccounts[chain][address].account);
        dispatch(getBalance(balance['c'][0] / 10 ** (balance['e'] - 14)));

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
        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        const signer = await helper.signerFromPk(signer_);

        const result = inner.transferNativeToForeign(
            signer, nonce, to, value
        )
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
        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        const signer = await helper.signerFromPk(signer_);

        const result = inner.unfreezeWrapped(
            signer, nonce, to, value
        )
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

        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        const sender = await helper.signerFromPk(sender_);

        const result = inner.transferNftToForeign(
            sender, chain_nonce, to, id
        );
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
export const sendNFTForeign = (chain,sender_, to, id) => async dispatch => {
    try {

        const helper = ChainFactory[chain];
        const inner = await helper.inner();
        const sender = await helper.signerFromPk(sender_);

        const result = inner.unfreezeWrappedNft(
            sender, to, id
        );
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
        const helper = ChainFactory[chain];
        const inner = await helper.inner();

        const result = inner.listNft(owner);
        result.then(data => {
            console.log(data);
        });

    } catch (error) {
        console.error(error);
    }
}


/**
 * Unified way of displaying a link
 * @param {string} message 
 */
const showAlert = message => {
    alert(message)
}

