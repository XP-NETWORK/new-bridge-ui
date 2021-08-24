import { nftMetaService, NFTMetaService } from "nft-db-client";
export { nftMetaDtoMapper } from "nft-db-client"

export function localNFTMetaService(): NFTMetaService {
    return nftMetaService("http://localhost:5000");
}

export function remoteNFTMetaService(): NFTMetaService {
    return nftMetaService("https://bridge.xp.network/db")
}
