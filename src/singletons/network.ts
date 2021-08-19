import { nftMetaService, NFTMetaService } from "../model/network/NFTMetaService";
export { nftMetaDtoMapper } from "../model/network/NFTMetaDtoMapper"

export function localNFTMetaService(): NFTMetaService {
    return nftMetaService("localhost:5000");
}