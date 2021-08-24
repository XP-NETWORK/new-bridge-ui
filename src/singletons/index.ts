import { nftMetaDtoMapper } from "nft-db-client";
import { networkNFTMetaRepo } from "nft-db-client";
import { remoteNFTMetaService } from "./network";

export const remoteNFTMeta = networkNFTMetaRepo(
    remoteNFTMetaService(),
    nftMetaDtoMapper()
);