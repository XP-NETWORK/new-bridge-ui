import { nftMetaDtoMapper } from "../model/network/NFTMetaDtoMapper";
import { networkNFTMetaRepo } from "../repository/NFTMeta/NetworkNFTMetaRepo";
import { remoteNFTMetaService } from "./network";

export const remoteNFTMeta = networkNFTMetaRepo(
    remoteNFTMetaService(),
    nftMetaDtoMapper()
);