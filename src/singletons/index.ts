import { nftMetaDtoMapper } from "nft-db-client";
import { networkNFTMetaRepo } from "nft-db-client";
import { configNFTMetaService } from "./network";

export const remoteNFTMeta = networkNFTMetaRepo(
    configNFTMetaService(),
    nftMetaDtoMapper()
);