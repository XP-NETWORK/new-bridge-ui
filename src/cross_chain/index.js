/* eslint-disable no-undef */
import {
  elrondHelperFactory,
  polkadotPalletHelperFactory,
  web3HelperFactory,
  txnSocketHelper,
} from 'testsuite-ts'
import { ChainConfig } from '../config'
import { CHAIN_BY_NONCE, CHAIN_INFO } from './consts'
import { abi } from '../assets/Minter.json'
import { ethers, Wallet } from 'ethers'
import { Keyring } from '@polkadot/keyring'
import { UserSigner } from '@elrondnetwork/erdjs/out'
import { abi as ERC1155_abi } from 'testsuite-ts/dist/fakeERC1155.json'

const fromHexString = (hexString) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))

const decoder = new TextDecoder()

/**
 * Socket for tracking cross chain actions
 */
export const txnSocket = txnSocketHelper(ChainConfig.validator_txn_socket, {
  path: '/txsocket/socket.io',
})

/**
 * Get balances of all wrapped tokens for an address
 *
 * @param {PolkadotHelper | ElrondHelper | Web3Helper} helper helper object in this project
 * @param {*} address address in source chain
 * @returns Array with [CHAIN IDENTIFIER, BALANCE] as elements
 */
const balanceOfWrappedTokens = async (helper, address) => {
  const inner = await helper.inner()
  const ents = Object.entries(CHAIN_INFO)
  const nonces = ents.flatMap(([ident, { nonce }]) =>
    ident !== helper.ident ? [nonce] : []
  )

  const bals = await inner.balanceWrappedBatch(address, nonces)

  return Array.from(bals).map(([nonce, bal]) => {
    const chain = CHAIN_BY_NONCE[nonce]
    return [chain, bal.div(CHAIN_INFO[chain].decimals)]
  })
}

export const balanceAllTokens = async (helper, address) => {
  const wrapped = await balanceOfWrappedTokens(helper, address)
  const inner = await helper.inner()
  const bal = await inner.balance(address)
  wrapped.push([helper.ident, bal.div(CHAIN_INFO[helper.ident].decimals)])

  return wrapped
}

/**
 * Wrapper over PolkadotPalletHelper
 */
export function PolkadotHelper() {
  let polka = undefined
  const keyring = new Keyring()

  async function requirePolka() {
    if (polka === undefined) {
      polka = await polkadotPalletHelperFactory(ChainConfig.xpnode)
    }
  }

  function tryDecodeWrappedPolkadotNft(nftDat /* Buffer */) {
    /// TokenLen(4 by), TokenIdent(TokenLen by), Nonce(8 by)
    /// BinaryCodec is broken for browsers. Decode manually :|
    if (nftDat.length < 12) {
      return undefined
    }

    const tokenLen = new Uint32Array(nftDat.slice(0, 4).reverse())[0]
    if (nftDat.length !== 12 + tokenLen) {
      return undefined
    }
    const token = decoder.decode(nftDat.slice(4, 4 + tokenLen))
    // TODO: Consider LO
    // tfw js can't convert be bytes to u64
    const nonce = new Uint32Array(
      nftDat.slice(4 + tokenLen, 12 + tokenLen).reverse()
    )[0].toString(16)

    return { token, nonce }
  }

  return {
    ident: 'XP.network',
    /**
     * @returns inner PolkadotPalletHelper
     */
    async inner() {
      await requirePolka()

      return polka
    },
    tryDecodeWrappedPolkadotNft,
    /**
     * Whether the given NFT is originally from elrond
     *
     * @param {address} owner Owner of this nft
     * @param {string} ident  Nft identifier
     * @returns
     */
    async isElrondNft(owner, ident) {
      await requirePolka()

      const nfts = polka.listNft(owner)
      const nftDat = fromHexString(nfts.get(ident).replace('0x', ''))

      return tryDecodeWrappedPolkadotNft(nftDat) !== undefined
    },
    /**
     * Create keypair from uri
     *
     * @param {string} pk Derivation path uri
     * @returns Keypair signer
     */
    async signerFromPk(pk) {
      return { sender: keyring.createFromUri(pk, undefined, 'sr25519') }
    },
  }
}

/**
 * Wrapper over ElrondHelper from testsuite-ts
 */
export function ElrondHelper() {
  let elrd = undefined

  async function requireElrd() {
    if (elrd === undefined) {
      elrd = await elrondHelperFactory(
        ChainConfig.elrond_node,
        ChainConfig.elrond_minter,
        ChainConfig.elrond_esdt,
        ChainConfig.elrond_esdt_nft
      )
    }
  }

  return {
    ident: 'Elrond',
    /**
     *
     * @returns Inner ElrondHelper from testsuite-ts
     */
    async inner() {
      await requireElrd()

      return elrd
    },
    /**
     * Whether the given NFT is from a foreign chain
     * @param {address} _owner Address of the nft owner
     * @param {string} ident Identifier of the nft
     * @returns bool
     */
    async isWrappedNft(_owner, ident) {
      return ident === ChainConfig.elrond_esdt_nft
    },
    /**
     * Create elrond user signer from pem
     *
     * @param {string} pk pem content
     * @returns Elrond UserSigner
     */
    async signerFromPk(pk) {
      return UserSigner.fromPem(pk)
    },
  }
}

/**
 * Wrapper over Web3Helper from testsuite-ts
 *
 * @param {string} chain identifier of the web3 chain
 */
export function Web3Helper(chain) {
  let web3 = undefined
  let web3Provider = undefined
  const minter_addr = ChainConfig.web3_minters[chain]
  const erc1155_abi = new ethers.utils.Interface(ERC1155_abi)

  async function requireWeb3() {
    if (!web3) {
      web3Provider = ethers.providers.getDefaultProvider(
        CHAIN_INFO[chain].rpcUrl
      )
      await web3Provider.ready

	  web3 = await web3HelperFactory(
		web3Provider,
		minter_addr,
		new ethers.utils.Interface(abi),
		ChainConfig.web3_erc1155[chain]
	  )
    }
  }

  return {
    ident: chain,
    /**
     * @returns Inner Web3Helper from testsuite-ts
     */
    async inner() {
      await requireWeb3()

      return web3
    },
    async getReceiptFromHash(tx_hash) {
      await requireWeb3()
      return await web3Provider.waitForTransaction(tx_hash)
    },
    async getArgsFromErcTransfer(receipt, target_addr) {
      await requireWeb3()
      const log = receipt.logs.find((log) => log.address === target_addr)
      if (log === undefined) {
        throw Error("couldn't extract token id")
      }

      const evdat = erc1155_abi.parseLog(log)

      return evdat.args
    },
    /**
     * Create ethers Wallet object from private key
     *
     * @param {string} pk private key
     * @returns ethers Wallet object
     */
    async signerFromPk(pk) {
      await requireWeb3()

      return new Wallet(pk, web3Provider)
    },
  }
}

/**
 * Factories for Chains by Chain Name
 */
export const ChainFactory = {
  'XP.network': PolkadotHelper(),
  Elrond: ElrondHelper(),
  HECO: Web3Helper('HECO'),
  BSC: Web3Helper('BSC'),
  Ropsten: Web3Helper('Ropsten'),
  Avalanche: Web3Helper('Avalanche'),
  Polygon: Web3Helper('Polygon'),
  Fantom: Web3Helper('Fantom'),
}
