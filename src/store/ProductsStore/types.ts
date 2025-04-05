export type GetProductsListParams = {
    perPage?: number;
    page?: number;
};

export interface IProductsStore {
    getProductsList(
        params: GetProductsListParams
    ): Promise<void>;
}
