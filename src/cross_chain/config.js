import { chains } from "../config";

const polkadotBlockPrefix = "https://explorer.xp.network/#/explorer/query";
const elrondTxnPrefix = "https://devnet-explorer.elrond.com/transactions";

export const ChainConfig = {
    "xpnode": "wss://34.240.149.237:443/node", //"wss://bridge.xp.network:443/node", //
    "elrond_node": "https://devnet-api.elrond.com",
    "elrond_minter": "erd1qqqqqqqqqqqqqpgqe8lzlc2husrrthhyavhcj50kpneqzf9ms3ys4anmfd", //"erd1qqqqqqqqqqqqqpgq7ysztrj922cs53e5wh2vdmeds9pd69wms3ysy3tyy9", //
    "elrond_event_rest": "http://34.240.149.237/event_rest", //"https://bridge.xp.network/event_rest", //
    "elrond_esdt": "XPNET-1dba6e", //"XPNET-cdf688", //
    "elrond_esdt_nft": "XPNFT-594a29", //"XPNFT-ff3b98", //
    "validator_txn_socket": "ws://34.240.149.237/txsocket/", //"wss://bridge.xp.network/", //
    "web3_minters": {
        'HECO': "0xEf5b44491d1da9E30803d666Fb7BdD06141f0b82",
        "BSC": "0x471bF01b8C622C00652F336651747B1A5d37b5ea",
        "ROPSTEN": "0x66b07bC16F499a0e835c5b277AF19555a05578c1"
    },
    "web3_erc1155": {
        "HECO": "0x65c823E97d61F5Db30a433612a4AF3CC26aeD4ba",
        "BSC": "0xaFFA531E294E8e4b6647F993c12216D8CFA90903",
        "ROPSTEN": "0x5d9f23f7253Efef3926E934829Ab65C0092E218B",
    }
};

export const ExplorerPrefix = Object.fromEntries(
    [
        [chains[0], polkadotBlockPrefix],
        [chains[1], elrondTxnPrefix],
        [chains[2], "heco"],
        [chains[3], "bsc"],
        [chains[4], "ropsten"]
    ]
);