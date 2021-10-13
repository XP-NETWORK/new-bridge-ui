import {
  NetworkBatchExchangeRateService,
  networkBatchExchangeRateService,
} from 'crypto-exchange-rate/dist/model/network/BatchExchangeRateService'
import { nftMetaService, NFTMetaService } from 'nft-db-client'
import { dbUrl, exchangeUrl } from '../config'
export { nftMetaDtoMapper } from 'nft-db-client'

export function configNFTMetaService(): NFTMetaService {
  return nftMetaService(dbUrl!)
}

export function configBatchExchangeService(): NetworkBatchExchangeRateService {
  return networkBatchExchangeRateService(exchangeUrl!)
}
