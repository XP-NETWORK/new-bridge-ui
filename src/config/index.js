export const chains = [
  'XP.network', // 0
  'BSC', // 1
  'Elrond', // 2
  'HECO', // 3
  'Ropsten', // 4
  'Avalanche', // 5
  'Polygon', // 6
  'Fantom', // 7
  'Tron', // 8
  'Celo', // 9
  'Harmony', // 10
  'Cardano', // 11
  'Solana', // 12
  'Algorand', // 13
  'Diem', // 14
]

export const coins = [
  'XPNET', // 0
  'BNB', // 1
  'eGLD', // 2
  'HT', // 3
  'ETH', // 4
  'AVAX', // 5
  'MATIC', // 6
  'FTM', // 7
  'TRX', // 8
  'CELO', // 9
  'ONE', //10
]

export const exchangeRates = {
  XPNET: 0.75,
  BNB: 402.9,
  eGLD: 146.55,
  HT: 14.1,
  ETH: 3033.8,
  MATIC: 420.1,
  FTM: 69.5,
  TRX: 45.6,
  CELO: 42.6,
  ONE: 59.5,
}

export const ChainConfig = {
  xpnode: process.env.REACT_APP_XP_NODE,
  elrond_node: process.env.REACT_APP_ELRD_NODE,
  elrond_minter: process.env.REACT_APP_ELRD_MINTER,
  elrond_esdt: process.env.REACT_APP_ELRD_ESDT,
  elrond_esdt_nft: process.env.REACT_APP_ELRD_ESDT_NFT,
  validator_txn_socket: process.env.REACT_APP_VALIDATOR_SOCK,
  tron_event_rest: process.env.REACT_APP_TRON_EVENT_REST,
  web3_minters: {
    HECO: process.env.REACT_APP_HECO_MINTER,
    BSC: process.env.REACT_APP_BSC_MINTER,
    Ropsten: process.env.REACT_APP_ROP_MINTER,
    Avalanche: process.env.REACT_APP_AVA_MINTER,
    Polygon: process.env.REACT_APP_POLY_MINTER,
    Fantom: process.env.REACT_APP_FTM_MINTER,
    Tron: process.env.REACT_APP_TRON_MINTER,
    EthereumClassic: process.env.REACT_APP_ETC_MINTER,
    Celo: process.env.REACT_APP_CELO_MINTER,
    Harmony: process.env.REACT_APP_HARMONY_MINTER,
  },
  web3_erc1155: {
    HECO: process.env.REACT_APP_HECO_ERC1155,
    BSC: process.env.REACT_APP_BSC_ERC1155,
    Ropsten: process.env.REACT_APP_ROP_ERC1155,
    Avalanche: process.env.REACT_APP_AVA_ERC1155,
    Polygon: process.env.REACT_APP_POLY_ERC1155,
    Fantom: process.env.REACT_APP_FTM_ERC1155,
    Tron: process.env.REACT_APP_TRON_ERC1155,
    EthereumClassic: process.env.REACT_APP_ETC_ERC1155,
    Celo: process.env.REACT_APP_CELO_ERC1155,
    Harmony: process.env.REACT_APP_HARMONY_ERC1155,
  },
  web3_predefined: {
    HECO: process.env.REACT_APP_HECO_PREM,
    BSC: process.env.REACT_APP_BSC_PREM,
    Ropsten: process.env.REACT_APP_ROP_PREM,
    Avalanche: process.env.REACT_APP_AVA_PREM,
    Polygon: process.env.REACT_APP_POLY_PREM,
    Fantom: process.env.REACT_APP_FTM_PREM,
    Tron: process.env.REACT_APP_TRON_PREM,
    EthereumClassic: process.env.REACT_APP_ETC_PREM,
    Celo: process.env.REACT_APP_CELO_PREM,
    Harmony: process.env.REACT_APP_HARMONY_PREM,
  },
}

export const dbUrl = process.env.REACT_APP_DB

export const ExplorerPrefix = {
  'XP.network': process.env.REACT_APP_XP_EXPLORER,
  Elrond: process.env.REACT_APP_ELRD_EXPLORER,
  HECO: process.env.REACT_APP_HECO_EXPLORER,
  BSC: process.env.REACT_APP_BSC_EXPLORER,
  Ropsten: process.env.REACT_APP_ROP_EXPLORER,
  Avalanche: process.env.REACT_APP_AVA_EXPLORER,
  Polygon: process.env.REACT_APP_POLY_EXPLORER,
  Fantom: process.env.REACT_APP_FTM_EXPLORER,
  Tron: process.env.REACT_APP_TRON_EXPLORER,
  EthereumClassic: process.env.REACT_APP_ETC_EXPLORER,
  Celo: process.env.REACT_APP_CELO_EXPLORER,
  Harmony: process.env.REACT_APP_HARMONY_EXPLORER,
}
