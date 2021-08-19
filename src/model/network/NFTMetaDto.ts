export type BNFTMetaDto = {
    hash: string;
    link: string;
    name: string;
    data: string;
}

export type BaseDoc = {
    _id: string;
}

export type NFTMetaDtoNully = BaseDoc & Partial<BNFTMetaDto>;

export type NFTMetaDto = BaseDoc & BNFTMetaDto;

export function isNotNully(nully: NFTMetaDtoNully): nully is NFTMetaDto {
    return nully.hash !== null || nully.hash !== undefined;
}