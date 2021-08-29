import { nftMetaService, NFTMetaService } from "nft-db-client";
import { dbUrl } from "../config";
export { nftMetaDtoMapper } from "nft-db-client"

export function configNFTMetaService(): NFTMetaService {
    return nftMetaService(dbUrl!);
}
