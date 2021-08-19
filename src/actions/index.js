import { listNFTs } from '../thunks';
import actionTypes from './actionTypes';

export const selectFromChain = (value) => ({
    type: actionTypes.SELECT_FROM_CHAIN,
    payload: value
});

export const selectToChain = (value) => ({
    type: actionTypes.SELECT_TO_CHAIN,
    payload: value
});

export const selectFromAccount = (value) => ({
    type: actionTypes.SELECT_FROM_ACCOUNT,
    payload: value
});

export const selectToAccount = (value) => ({
    type: actionTypes.SELECT_TO_ACCOUNT,
    payload: value
});

export const selectNFT = (hash, nonce) => ({
    type: actionTypes.SELECT_NFT,
    payload: {
        hash,
        nonce
    }
});

export const selectCoin = (value) => ({
    type: actionTypes.SELECT_COIN,
    payload: value
});

export const swapChains = () => ({
    type: actionTypes.SWAP_CHAINS
});

export const transferCoins = () => ({
    type: actionTypes.TRANSFER_COINS
});

export const transferNFT = () => ({
    type: actionTypes.TRANSFER_NFT
});

export const changeAmount = (value) => ({
    type: actionTypes.CHANGE_AMMOUNT,
    payload: value
});

export const getBalance = (value) => ({
    type: actionTypes.GET_BALANCE,
    payload: value
});

export const listNfts = (value) => ({
    type: actionTypes.LIST_NFTS,
    payload: value
})