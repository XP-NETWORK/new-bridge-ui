import actionTypes from '../actions/actionTypes'
import { chains, coins, exchangeRates } from '../config'
import { PredefinedAccounts } from '../cross_chain/accounts'
import 'semantic-ui-css/semantic.min.css'

let fromChain = chains[0]
let toChain = chains[1]
let coin = coins[0]

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
  fromAccountS: Object.keys(PredefinedAccounts[fromChain]),
  toAccountS: Object.keys(PredefinedAccounts[toChain]),
  nftList: [],

  // Liquidity related
  coin,
  coins,
  amount: '',

  //Balance
  acctBalanceCoins: 0,
  balances: [],
  exchangeRate: exchangeRates[coin],

  // UI related
  loader: false,
}

export const selectReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actionTypes.SELECT_FROM_CHAIN: {
      console.log('Clicked fromChain', payload)

      fromChain = payload

      const fromAccount = Object.keys(PredefinedAccounts[fromChain])[0]
      coin = coins[chains.indexOf(fromChain)]
      return {
        ...state,
        coin,
        exchangeRate: exchangeRates[coin],
        fromChain,
        fromAccount,
        fromAccountS: Object.keys(PredefinedAccounts[fromChain]),
      }
    }
    case actionTypes.SELECT_TO_CHAIN: {
      toChain = payload.replace(/(?:\r\n|\r|\n)/g, '')
      return {
        ...state,
        toChain,
        toAccount: Object.keys(PredefinedAccounts[toChain])[0],
        toAccountS: Object.keys(PredefinedAccounts[toChain]),
      }
    }
    case actionTypes.SELECT_FROM_ACCOUNT: {
      return {
        ...state,
        fromAccount: payload.replace(/(?:\r\n|\r|\n)/g, ''),
      }
    }
    case actionTypes.SELECT_TO_ACCOUNT: {
      return {
        ...state,
        toAccount: payload.replace(/(?:\r\n|\r|\n)/g, ''),
      }
    }
    case actionTypes.SWAP_CHAINS: {
      ;[fromChain, toChain] = [state.toChain, state.fromChain]
      const [fromAccount, toAccount] = [state.toAccount, state.fromAccount]
      const [fromAccountS, toAccountS] = [state.toAccountS, state.fromAccountS]
      coin = coins[chains.indexOf(fromChain)]
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
    case actionTypes.SELECT_COIN: {
      coin = payload
      return {
        ...state,
        coin,
      }
    }
    case actionTypes.SELECT_NFT: {
      return {
        ...state,
        selNFTData: payload,
      }
    }
    case actionTypes.CHANGE_AMMOUNT: {
      return {
        ...state,
        amount: payload,
      }
    }
    case actionTypes.GET_BALANCE: {
      return {
        ...state,
        acctBalanceCoins: payload,
      }
    }
    case actionTypes.LIST_NFTS: {
      return {
        ...state,
        nftList: payload,
      }
    }
    case actionTypes.GET_BALANCES: {
      return {
        ...state,
        balances: payload,
      }
    }
    case actionTypes.SHOW_LOADER: {
      return {
        ...state,
        loader: payload,
      }
    }
    case actionTypes.SHOW_MODAL: {
      return {
        ...state,
        modalMessage: payload,
      }
    }
    case actionTypes.NFT_LOADING: {
      return {
        ...state,
        nftLoader: payload,
      }
    }
    default: {
      return state
    }
  }
}
