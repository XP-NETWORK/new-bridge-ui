export const chains = [
  'BSC', // 0
  'Elrond', // 1
  'HECO', // 2
  'Ropsten', // 3
  'Avalanche', // 4
  'Polygon', // 5
  'Fantom', // 6
  "Tron", // 7
  'Cardano', // 8
  'Solana', // 9
  'Algorand', // 10
  "Diem", // 11
]

export const coins = [
  'BNB', // 0
  'eGLD', // 1
  'HT', // 2
  'ETH', // 3
  'AVAX', // 4
  'MATIC', // 5
  'FTM', // 6
  'TRX', // 7
]

export const exchangeRates = {
  BNB: 402.9,
  eGLD: 146.55,
  HT: 14.1,
  ETH: 3033.8,
  MATIC: 420.1,
  FTM: 69.5,
  TRX: 45.6,
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
  },
  web3_erc1155: {
    HECO: process.env.REACT_APP_HECO_ERC1155,
    BSC: process.env.REACT_APP_BSC_ERC1155,
    Ropsten: process.env.REACT_APP_ROP_ERC1155,
    Avalanche: process.env.REACT_APP_AVA_ERC1155,
    Polygon: process.env.REACT_APP_POLY_ERC1155,
    Fantom: process.env.REACT_APP_FTM_ERC1155,
    Tron: process.env.REACT_APP_TRON_ERC1155,
  },
  web3_predefined: {
    HECO: process.env.REACT_APP_HECO_PREM,
    BSC: process.env.REACT_APP_BSC_PREM,
    Ropsten: process.env.REACT_APP_ROP_PREM,
    Avalanche: process.env.REACT_APP_AVA_PREM,
    Polygon: process.env.REACT_APP_POLY_PREM,
    Fantom: process.env.REACT_APP_FTM_PREM,
    Tron: process.env.REACT_APP_TRON_PREM,
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
  Tron: process.env.REACT_APP_TRON_EXPLORER
}
