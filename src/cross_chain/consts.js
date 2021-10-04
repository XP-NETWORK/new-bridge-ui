import { SupportedCurrency } from 'crypto-exchange-rate/dist/model/domain'
import { coins } from '../config'

export const CHAIN_INFO = {
  'XP.network': {
    nonce: 1,
    native: 'XPNET',
    decimals: 1e12,
    currency: SupportedCurrency.XPNET
  },
  Elrond: {
    nonce: 2,
    native: 'EGLD',
    decimals: 1e18,
    currency: SupportedCurrency.EGLD
  },
  HECO: {
    nonce: 3,
    native: coins[3],
    chainId: 256,
    rpcUrl: 'https://http-testnet.hecochain.com',
    decimals: 1e18,
    currency: SupportedCurrency.HT
  },
  BSC: {
    nonce: 4,
    native: coins[1],
    chainId: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s2.binance.org:8545',
    decimals: 1e18,
    currency: SupportedCurrency.BNB
  },
  Ropsten: {
    nonce: 5,
    native: coins[4],
    chainId: 3,
    rpcUrl:
      'https://eth-ropsten.alchemyapi.io/v2/-x2YuopIsMFeUO2uF_FHPG73-2xk-60x',
    decimals: 1e18,
    currency: SupportedCurrency.ETH
  },
  Avalanche: {
    nonce: 6,
    native: coins[5],
    chainId: 43113,
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    decimals: 1e18,
    currency: SupportedCurrency.AVAX
  },
  Polygon: {
    nonce: 7,
    native: coins[6],
    chainId: 80001,
    rpcUrl: 'https://matic-testnet-archive-rpc.bwarelabs.com',
    decimals: 1e18,
    currency: SupportedCurrency.MATIC
  },
  Fantom: {
    nonce: 8,
    native: coins[7],
    chainId: 0xfa2,
    rpcUrl: 'https://rpc.testnet.fantom.network/',
    decimals: 1e18,
    currency: SupportedCurrency.FTM
  },
  Tron: {
    nonce: 0x9,
    decimals: 1e6,
    native: coins[8],
    rpcUrl: 'https://api.shasta.trongrid.io/',
    currency: SupportedCurrency.TRX
  },
  Celo: {
    nonce: 0xb,
    native: coins[9],
    decimals: 1e18,
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    chainId: 44787,
    currency: SupportedCurrency.CELO
  },
  Harmony: {
    nonce: 0xc,
    native: coins[10],
    decimals: 1e18,
    rpcUrl: 'https://api.s0.b.hmny.io',
    chainId: 1666700000,
    currency: SupportedCurrency.ONE
  }
}

export const CHAIN_BY_NONCE = Object.fromEntries(
  Object.entries(CHAIN_INFO).map(([ident, { nonce }]) => [nonce, ident])
)

export const web3TokenStds = ['ERC721', 'ERC1155']
