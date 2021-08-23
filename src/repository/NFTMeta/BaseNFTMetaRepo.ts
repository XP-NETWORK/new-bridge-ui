import { NFTMeta } from "../../model/domain/NFTMeta";

export type NFTMetaRepo = {
    /**
     * Get all NFTs in the DB
     */
    getAll(): Promise<NFTMeta[]>;
    /**
     * Get an NFT by ObjectId
     * 
     * @param id ObjectId
     */
    getById(id: string): Promise<NFTMeta | undefined>;
    /**
     * Get NFT by hash
     * 
     * @param hash hash of the NFT
     */
    getByHash(hash: string): Promise<NFTMeta | undefined>;
    /**
     * Create a new nft in db
     * 
     * @param hash hash of the nft
     * @param link link of the nft
     * @param name name of the nft
     * @param data any other data
     */
    create(hash: string, link: string, name: string, data: string): Promise<NFTMeta | undefined>;
    /**
     * Create an empty entry
     * @returns ObjectId of the new empty nft entry
     */
    createEmpty(): Promise<string | undefined>;
    /**
     * update the data of an nft
     * 
     * @param id ObjectId of the nft
     * @param hash (opt) hash to set
     * @param link (opt) link to set
     * @param name (opt) name to set
     * @param data (opt) data to set
     */
    updateById(id: string, hash: string | null, link: string | null, name: string | null, data: string | null): Promise<NFTMeta | undefined>;
    /**
     * delete nft by id
     * 
     * @param id ObjectId of the nft
     */
    deleteById(id: string): Promise<NFTMeta | undefined>;
}