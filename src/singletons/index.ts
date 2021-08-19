import { nftMetaDtoMapper } from "../model/network/NFTMetaDtoMapper";
import { networkNFTMetaRepo } from "../repository/NFTMeta/NetworkNFTMetaRepo";
import { localNFTMetaService } from "./network";

export const localNFTMeta = networkNFTMetaRepo(
    localNFTMetaService(),
    nftMetaDtoMapper()
);