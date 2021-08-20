import { nftMetaService, NFTMetaService } from "../model/network/NFTMetaService";
export { nftMetaDtoMapper } from "../model/network/NFTMetaDtoMapper"

export function localNFTMetaService(): NFTMetaService {
    return nftMetaService("http://localhost:5000");
}

export function remoteNFTMetaService(): NFTMetaService {
    return nftMetaService("https://testing-bridge.xp.network/db")
}