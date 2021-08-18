import actionTypes from '../actions/actionTypes';
import {chains, coins, exchangeRates} from '../config';
import {PredefinedAccounts} from '../cross_chain/accounts';

let fromChain = chains[0];
let toChain = chains[1];
let coin = coins[0];

const initialState = {
    // Chain related
    fromChain,
    toChain,
    // Dropdown Chains
    fromChains: chains,
    toChains: chains,
    // Account related
    fromAccount: Object.keys(PredefinedAccounts[fromChain])[0],
    toAccount: Object.keys(PredefinedAccounts[toChain])[0],
    // Dropdown Accounts:
    fromAccountS:Object.keys(PredefinedAccounts[fromChain]),
    toAccountS:Object.keys(PredefinedAccounts[toChain]),
    // NFT related
    selNFTHash:'',
    selNFTNonce:'',

    // Liquidity related
    coin,
    coins,
    amount: '',

    //Balance
    acctBalanceCoins:0,
    exchangeRate: exchangeRates[coin]

};

export const selectReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case actionTypes.SELECT_FROM_CHAIN:{

            fromChain = payload;
            const fromAccount = Object.keys(PredefinedAccounts[fromChain])[0];
            coin = coins[chains.indexOf(fromChain)];

            return {
                ...state,
                coin,
                exchangeRate: exchangeRates[coin],
                fromChain,
                fromAccount,
                fromAccountS:Object.keys(PredefinedAccounts[fromChain])
            }
        }
        case actionTypes.SELECT_TO_CHAIN:{
            toChain = payload;
            return {
                ...state, 
                toChain,
                toAccount: Object.keys(PredefinedAccounts[toChain])[0],
                toAccountS:Object.keys(PredefinedAccounts[toChain])
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
            [fromChain, toChain] = [state.toChain, state.fromChain];
            const [fromAccount, toAccount] = [state.toAccount, state.fromAccount];
            const [fromAccountS, toAccountS] = [state.toAccountS, state.fromAccountS];
            coin = coins[chains.indexOf(fromChain)];
            return {
                ...state, 
                coin,
                exchangeRate: exchangeRates[coin],
                fromChain, 
                toChain, 
                fromAccount, 
                toAccount,
                fromAccountS,
                toAccountS,
            }
        }
        case actionTypes.SELECT_COIN:{
            coin = payload;
            return {
                ...state, coin
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
        case actionTypes.CHANGE_AMMOUNT:{
            return {
                ...state,
                amount: payload
            }
        }
        case actionTypes.GET_BALANCE:{
            return {
                ...state,
                acctBalanceCoins:payload
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
