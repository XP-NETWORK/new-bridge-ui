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
        rpcUrl: "https://data-seed-prebsc-1-s2.binance.org:8545",
        decimals: 1E18
    },
    'Ropsten': {
        nonce: 5,
        native: coins[4],
        chainId: 3,
        rpcUrl: "https://eth-ropsten.alchemyapi.io/v2/-x2YuopIsMFeUO2uF_FHPG73-2xk-60x",
        decimals: 1E18
    }
};

export const CHAIN_BY_NONCE = Object.fromEntries(
    Object.entries(CHAIN_INFO).map(([ident, { nonce }]) => [nonce, ident])
);

export const web3TokenStds = ["ERC721", "ERC1155"];