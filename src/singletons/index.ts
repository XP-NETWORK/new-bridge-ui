import { cachedExchangeRateRepo, cmcBatchExchangeRepo } from 'crypto-exchange-rate'
import { cmcBatchExchangeRateService } from 'crypto-exchange-rate/dist/model/coinmarketcap/BatchExchangeRateService'
import { nftMetaDtoMapper } from 'nft-db-client'
import { networkNFTMetaRepo } from 'nft-db-client'
import { configNFTMetaService } from './network'

export const remoteNFTMeta = networkNFTMetaRepo(
  configNFTMetaService(),
  nftMetaDtoMapper()
)
