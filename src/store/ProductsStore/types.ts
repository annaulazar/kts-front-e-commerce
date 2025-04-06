export type GetProductsListParams = {
    perPage?: number;
    page?: number;
    populate?: string[];
    filters?: Record<string, Record<string, string | Record<string, string>>>
};

export interface IProductsStore {
    getProductsList(
        params: GetProductsListParams,
        endpoint: string
    ): Promise<void>;
}
