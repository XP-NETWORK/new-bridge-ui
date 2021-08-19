/* eslint-disable no-undef */
import { elrondHelperFactory, polkadotPalletHelperFactory, web3HelperFactory, txnSocketHelper } from 'testsuite-ts';
import { ChainConfig } from './config';
import { CHAIN_INFO } from './consts';
import { abi } from '../assets/Minter.json'
import { ethers, Wallet } from 'ethers';

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const decoder = new TextDecoder();

/**
 * Socket for tracking cross chain actions
 */
export const txnSocket = txnSocketHelper(ChainConfig.validator_txn_socket, {
    path: "/txsocket/socket.io"
});

/**
 * Wrapper over PolkadotPalletHelper
 */
export function PolkadotHelper() {
    let polka = undefined;

    async function requirePolka() {
        if (polka === undefined) {
            polka = await polkadotPalletHelperFactory(
                ChainConfig.xpnode
            );
        }
    }

    function tryDecodeWrappedPolkadotNft(nftDat /* Buffer */) {
        /// TokenLen(4 by), TokenIdent(TokenLen by), Nonce(8 by)
        /// BinaryCodec is broken for browsers. Decode manually :|
        if (nftDat.length < 12) {
            return undefined;
        }

        const tokenLen = (new Uint32Array(nftDat.slice(0, 4).reverse()))[0];
        if (nftDat.length !== 12 + tokenLen) {
            return undefined;
        }
        const token = decoder.decode(nftDat.slice(4, 4+tokenLen));
        // TODO: Consider LO
        // tfw js can't convert be bytes to u64
        const nonce = (new Uint32Array(nftDat.slice(4+tokenLen, 12 + tokenLen).reverse()))[0].toString(16);

        return { token, nonce };
    }

    return {
        /**
         * @returns inner PolkadotPalletHelper 
         */
        async inner() {
            await requirePolka();

            return polka;
        },
        /**
         * Whether the given NFT is originally from elrond
         * 
         * @param {address} owner Owner of this nft
         * @param {string} ident  Nft identifier
         * @returns 
         */
        async isElrondNft(owner, ident) {
            await requirePolka();

            const nfts = polka.listNft(owner);
            const nftDat = fromHexString(nfts.get(ident).replace("0x", ""));

            return tryDecodeWrappedPolkadotNft(nftDat) !== undefined;
        }
    }
}

/**
 * Wrapper over ElrondHelper from testsuite-ts
 */
export function ElrondHelper() {
    let elrd = undefined;

    async function requireElrd() {
        if (elrd === undefined) {
            elrd = await elrondHelperFactory(
                ChainConfig.elrond_node,
                ChainConfig.elrond_minter,
                ChainConfig.elrond_event_rest,
                ChainConfig.elrond_esdt,
                ChainConfig.elrond_esdt_nft
            );
        }
    }

    return {
        /**
         * 
         * @returns Inner ElrondHelper from testsuite-ts
         */
        async inner() {
            await requireElrd();

            return elrd;
        },
        /**
         * Whether the given NFT is from a foreign chain
         * @param {address} _owner Address of the nft owner
         * @param {string} ident Identifier of the nft
         * @returns 
         */
        async isWrappedNft(_owner, ident) {
            return ident === ChainConfig.elrond_esdt_nft;
        }
    }
}

/**
 * Wrapper over Web3Helper from testsuite-ts
 * 
 * @param {string} chain identifier of the web3 chain
 */
export function Web3Helper(chain) {
    let web3 = undefined;
    let web3Provider = undefined;

    async function requireWeb3() {
        if (!web3) {
            web3Provider = ethers.providers.getDefaultProvider(CHAIN_INFO[chain].rpcUrl);
            await web3Provider.ready;
        }
        web3 = await web3HelperFactory(
            web3Provider,
            ChainConfig.web3_minters[chain],
            abi
        );
    }

    return {
        /**
         * @returns Inner Web3Helper from testsuite-ts
         */
        async inner() {
            await requireWeb3();

            return web3;
        },
        /**
         * Create ethers Wallet object from private key
         * 
         * @param {string} pk private key
         * @returns 
         */
        async accountFromPkey(pk) {
            await requireWeb3();

            return new Wallet(pk, web3Provider);
        }
    }
}

/**
 * Factories for Chains by Chain Name
 */
export const ChainFactory = {
    "XP.network": PolkadotHelper(),
    "Elrond": ElrondHelper(),
    "HECO": Web3Helper("HECO"),
    "BSC": Web3Helper("BSC"),
    "ROPSTEN": Web3Helper("ROPSTEN")
}
