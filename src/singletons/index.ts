import {
  cachedExchangeRateRepo,
  networkBatchExchangeRateRepo,
} from 'crypto-exchange-rate'
import { exchangeRateDtoMapper } from 'crypto-exchange-rate/dist/model/network/ExchangeRateDtoMapper'
import { nftMetaDtoMapper } from 'nft-db-client'
import { networkNFTMetaRepo } from 'nft-db-client'
import { configBatchExchangeService, configNFTMetaService } from './network'

export const remoteNFTMeta = networkNFTMetaRepo(
  configNFTMetaService(),
  nftMetaDtoMapper()
)

export const remoteExchangeRate = cachedExchangeRateRepo(
  networkBatchExchangeRateRepo(
    configBatchExchangeService(),
    exchangeRateDtoMapper()
  )
)
