import BigNumber from "bignumber.js";
import { coins } from "../config";

export const CHAIN_INFO = {
    'XP.network': { nonce: 1, native: 'XPNET', decimals: 1E12 },
    'Elrond': { nonce: 2, native: 'EGLD', decimals: 1E18 },
    'HECO': {
        nonce: 3,
        native: coins[2],
        chainId: 256,
        rpcUrl: "https://http-testnet.hecochain.com",
        decimals: 1E18
    },
    'BSC': {
        nonce: 4,
        native: coins[3],
        chainId: 97, 
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
        decimals: 1E18
    },
    'Ropsten': {
        nonce: 5,
        native: coins[4],
        chainId: 3,
        rpcUrl: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
        decimals: 1E18
    }
};

export const CHAIN_BY_NONCE = Object.fromEntries(
    Object.entries(CHAIN_INFO).map(([ident, { nonce }]) => [nonce, ident])
);

export const web3TokenStds = ["ERC721", "ERC1155"];