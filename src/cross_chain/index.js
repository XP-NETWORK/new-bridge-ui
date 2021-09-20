/* eslint-disable no-undef */
import {
  elrondHelperFactory,
  polkadotPalletHelperFactory,
  web3HelperFactory,
  tronHelperFactory,
  txnSocketHelper,
} from 'testsuite-ts'
import { ChainConfig } from '../config'
import { CHAIN_BY_NONCE, CHAIN_INFO } from './consts'
import { abi } from '../assets/Minter.json'
import { ethers, Wallet } from 'ethers'
import { Keyring } from '@polkadot/keyring'
import { UserSigner } from '@elrondnetwork/erdjs/out'
import TronWeb from 'tronweb'
import { PredefinedAccounts } from './accounts'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'

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

  return {
    ident: 'XP.network',
    /**
     * @returns inner PolkadotPalletHelper
     */
    async inner() {
      await requirePolka()

      return polka
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

export function baseWeb3Helper(chain, provider_construct, signer_construct) {
  let web3 = undefined
  let web3Provider = undefined
  const minter_addr = ChainConfig.web3_minters[chain]

  async function requireWeb3() {
    if (!web3) {
      web3Provider = provider_construct(
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
    /**
     * Create ethers Wallet object from private key
     *
     * @param {string} pk private key
     * @returns ethers Wallet object
     */
    async signerFromPk(pk) {
      await requireWeb3()

      return signer_construct(pk, web3Provider)
    },
  }
}

/**
 * Wrapper over Web3Helper from testsuite-ts
 *
 * @param {string} chain identifier of the web3 chain
 */
export const Web3Helper = (chain) => baseWeb3Helper(chain, ethers.providers.getDefaultProvider, (pk, p) => new Wallet(pk, p));

/**
 * 
 * Celo wrapper over Web3Helper from testsuite-ts
 */

export const CeloHelper = () => baseWeb3Helper("Celo", (uri) => new CeloProvider(uri), (pk, p) => new CeloWallet(pk, p));

/**
 * Wrapper over TronHelper from testsuite-ts
 */
export function TronHelper() {
  let tronWeb = undefined
  let tronWebp = undefined

  async function requireTron() {
    if (tronWeb === undefined) {
      tronWebp = new TronWeb({
        fullHost: CHAIN_INFO['Tron'].rpcUrl,
        privateKey: PredefinedAccounts['Tron']['ACC1'].key,
      })
      tronWeb = await tronHelperFactory(
        tronWebp,
        ChainConfig.tron_event_rest,
        ChainConfig.web3_erc1155['Tron'],
        ChainConfig.web3_minters['Tron'],
        abi
      )
    }
  }

  return {
    ident: 'Tron',
    /**
     *
     * @returns Inner TronHelper from testsuite-ts
     */
    async inner() {
      await requireTron()

      return tronWeb
    },
    /**
     * Placeholder for signerFromPk
     * tron uses raw strings for private keys
     *
     * @param {string} pk private key
     * @returns private key
     */
    signerFromPk: pk => Promise.resolve(pk),
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
  Tron: TronHelper(),
  EthereumClassic: Web3Helper('EthereumClassic'),
  Celo: CeloHelper(),
}
