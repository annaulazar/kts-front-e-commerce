import { ILocalStore } from 'utils/useLocalStore';
import ApiStore from 'store/ApiStore';
import { HTTPMethod } from 'store/ApiStore';

import {
    IProductsStore,
    GetProductsListParams,
} from './types';
import { Meta } from "utils/meta.ts";
import {makeObservable, observable, computed, action, runInAction} from "mobx";
import {normalizeProductItem, ProductItemModel} from "store/models/productitem.ts";

type PrivateFields = '_list' | '_meta';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';

export default class ProductsStore implements IProductsStore, ILocalStore {
    // стор, который делает запросы в сеть. Реализация стора в данной лекции не рассматривается
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: ProductItemModel[] = [];
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
        return this._list;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProductsList(
        params: GetProductsListParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._list = [];

        // запрос за списком репозиториев
        const response = await this._apiStore.request({
            method: HTTPMethod.GET,
            data: {
                populate: ['images', 'productCategory']
            },
            headers: {},
            endpoint: `/products`
        });

        runInAction(() => {
            if (response.success) {
                try {
                    this._meta = Meta.success;
                    this._list = response.data.data.map(normalizeProductItem);
                    return;
                } catch (e) {
                    this._meta = Meta.error;
                    this._list = [];
                }

            }

            this._meta = Meta.error;
        })
    }

    reset(): void {
        this._list = [];
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
}
