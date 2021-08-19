import { NFTMeta } from "../domain/NFTMeta";
import { isNotNully, NFTMetaDtoNully, NFTMetaDto } from "./NFTMetaDto";

export type NFTMetaDtoMapper = {
    toDomain(model: NFTMetaDtoNully): NFTMeta | undefined;
    fromDomain(domain: NFTMeta): NFTMetaDto;
    toDomainList(models: NFTMetaDtoNully[]): NFTMeta[];
    fromDomainList(domains: NFTMeta[]): NFTMetaDto[];
}

export function nftMetaDtoMapper(): NFTMetaDtoMapper {
    function toDomain(model: NFTMetaDtoNully): NFTMeta | undefined {
        return isNotNully(model) ? {
            ...model,
            id: model._id
        } : undefined;
    }

    function fromDomain(domain: NFTMeta): NFTMetaDto {
        return {
            ...domain,
            _id: domain.id
        }
    }

    return {
        toDomain,
        fromDomain,
        toDomainList: (models) => models.flatMap(m => {
            const res = toDomain(m);
            return res ? [res] : [];
        }),
        fromDomainList: (domains) => domains.map(fromDomain)
    }
}