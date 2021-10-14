import { NetworkModel } from 'crypto-exchange-rate'
import { nftMetaService, NFTMetaService } from 'nft-db-client'
import { dbUrl, exchangeUrl } from '../config'
export { nftMetaDtoMapper } from 'nft-db-client'

export function configNFTMetaService(): NFTMetaService {
  return nftMetaService(dbUrl!)
}

export function configBatchExchangeService(): NetworkModel.BatchExchangeRateService {
  return NetworkModel.batchExchangeRateService(exchangeUrl!)
}
