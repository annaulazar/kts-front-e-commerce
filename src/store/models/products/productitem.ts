export type ProductItemModel = {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
};

export const normalizeProductItem = (from: any): ProductItemModel => ({
    id: from.documentId,
    title: from.title,
    description: from.description,
    price: from.price,
    category: from.productCategory.title,
    images: from.images.map(item => item.url)
})