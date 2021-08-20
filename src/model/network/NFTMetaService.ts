import axios, { AxiosResponse } from "axios";
import { BaseDoc, NFTMetaDtoNully } from "./NFTMetaDto";

export type NFTMetaService = {
    all: () => Promise<NFTMetaDtoNully[]>;
    byId: (id: string) => Promise<NFTMetaDtoNully | undefined>;
    byHash: (hash: string) => Promise<NFTMetaDtoNully | undefined>;
    create: (hash: string, link: string, name: string, data: string) => Promise<NFTMetaDtoNully | undefined>; // TODO: Return Object id?
    createEmpty: () => Promise<BaseDoc | undefined>; // TODO: Return object id?
    updateById: (id: string, hash?: string, link?: string, name?: string, data?: string) => Promise<NFTMetaDtoNully | undefined>;
    deleteById: (id: string) => Promise<NFTMetaDtoNully | undefined>;
}

export function nftMetaService(baseURL: string): NFTMetaService {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    function tryWrap<T, A, A0>(call: (arg0: A0, ...args: A[]) => Promise<AxiosResponse<T>>): (arg0: A0, ...args: A[]) => Promise<T | undefined> {
        return async (arg0, ...args) => {
            try {
                const res = await call(arg0, ...args);
                return res.data;
            } catch (_) {
                return undefined;
            }
        }
    }
    function tryWrapNr<T>(call: () => Promise<AxiosResponse<T>>): () => Promise<T | undefined> {
        return async () => {
            try {
                const res = await call();
                console.log(res.data);
                return res.data;
            } catch (e) {
                console.trace(e);
                return undefined;
            }
        }
    }
    const allIn = tryWrapNr(() => client.get<NFTMetaDtoNully[]>('/all'));

    return {
        all: async () => (await allIn()) ?? [],
        byId: tryWrap((id) => client.get<NFTMetaDtoNully>(`/id/${id}`)),
        byHash: tryWrap((hash) => client.get<NFTMetaDtoNully>(`/hash/${hash}`)),
        create: tryWrap((hash: string, link: string, name: string, data: string) => client.post<NFTMetaDtoNully>("/create", {
                hash,
                link,
                name,
                data
            })
        ),
        createEmpty: tryWrapNr(() => client.post<BaseDoc>("/create")),
        updateById: tryWrap((id: string, hash?: string, link?: string, name?: string, data?: string) => {
            return client.put<NFTMetaDtoNully>(`/update/${id}`, {
                ...(hash && { hash }),
                ...(link && { link }),
                ...(name && { name }),
                ...(data && { data })
            })
    }),
        deleteById: tryWrap((id: string) => client.delete<NFTMetaDtoNully>(`/delete/${id}`))
    }
}