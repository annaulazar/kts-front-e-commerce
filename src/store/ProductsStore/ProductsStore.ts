import { ILocalStore } from 'utils/useLocalStore';
import ApiStore from 'store/ApiStore';
import { HTTPMethod } from 'store/ApiStore';

import {
    IProductsStore,
    GetProductsListParams,
} from './types';
import { Meta } from "utils/meta.ts";
import {makeObservable, observable, computed, action, runInAction} from "mobx";
import {normalizeProductItem, ProductItemModel} from "store/models/products";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "store/models/shared/collection.ts";


type PrivateFields = '_list' | '_meta';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';

export default class ProductsStore implements IProductsStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: CollectionModel<string, ProductItemModel[]> = getInitialCollectionModel();
    // состояние загрузки
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductsStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            reset: action,
            getProductsList: action
        });
    }

    get list(): ProductItemModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProductsList(
        params: GetProductsListParams,
        endpoint: string
    ): Promise<void> {
        params.populate = ['images', 'productCategory']
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        // запрос за списком репозиториев
        const response = await this._apiStore.request({
            method: HTTPMethod.GET,
            data: params,
            headers: {},
            endpoint: endpoint
        });

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error;
            }
            try {
                this._meta = Meta.success;
                const elements = response.data.data.map(normalizeProductItem);
                this._list = normalizeCollection(elements, (el) => el.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
            }
        })
    }

    reset(): void {
        this._list = getInitialCollectionModel();
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
