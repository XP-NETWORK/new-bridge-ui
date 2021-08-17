import actionTypes from '../actions/actionTypes';
import {chains, coins} from '../config'

const initialState = {
    fromChain: chains[0],
    toChain: chains[1],
    fromAccount: 'Alice_Stash',
    toAccount: 'Alice',
    coin: coins[0],
    selNFTHash:'',
    selNFTNonce:'',

};

export const selectReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case actionTypes.SELECT_FROM_CHAIN:{
            return {
                ...state, fromChain: payload
            }
        }
        case actionTypes.SELECT_TO_CHAIN:{
            return {
                ...state, toChain: payload
            }
        }
        case actionTypes.SELECT_FROM_ACCOUNT:{
            return{
                ...state, fromAccount: payload
            }
        }
        case actionTypes.SELECT_TO_ACCOUNT:{
            return {
                ...state, toAccount: payload
            }
        }
        case actionTypes.SWAP_CHAINS:{
            const [fromChain, toChain] = [state.toChain, state.fromChain];
            const [fromAccount, toAccount] = [state.toAccount, state.fromAccount];
            return {
                ...state, fromChain, toChain, fromAccount, toAccount
            }
        }
        case actionTypes.SELECT_COIN:{
            return {
                ...state, coin:payload
            }
        }
        case actionTypes.SELECT_NFT:{
            console.log(payload.hash, payload.nonce)
            return {
                ...state,
                selNFTHash:payload.hash,
                selNFTNonce:payload.nonce
            }
        }
        case actionTypes.TRANSFER_COINS:{
            // CODE HERE
            console.log("Transfer Tokens Click");
            return state;
        }
        case actionTypes.TRANSFER_NFT:{
            // CODE HERE
            console.log("Transfer NFT Click");
            return state;
        }
        default:{
            return state;
        }
    }
}