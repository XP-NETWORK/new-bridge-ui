import { NFTMetaDtoMapper } from "../../model/network/NFTMetaDtoMapper";
import { NFTMetaService } from "../../model/network/NFTMetaService";
import { NFTMetaRepo } from "./BaseNFTMetaRepo";

export function networkNFTMetaRepo(service: NFTMetaService, mapper: NFTMetaDtoMapper): NFTMetaRepo {
    return {
        getAll: async () => mapper.toDomainList(await service.all()),
        getById: (id) => service.byId(id).then(res => res && mapper.toDomain(res)),
        getByHash: (hash) => service.byHash(hash).then(res => res && mapper.toDomain(res)),
        create: (...args) => service.create(...args).then(res => res && mapper.toDomain(res)),
        createEmpty: () => service.createEmpty().then((v) => v?._id),
        updateById: (id) => service.updateById(id).then(res => res && mapper.toDomain(res)),
        deleteById: (id) => service.deleteById(id).then(res => res && mapper.toDomain(res))
    }
}