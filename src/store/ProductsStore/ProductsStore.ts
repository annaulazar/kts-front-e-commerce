import { ILocalStore } from 'utils/useLocalStore';
import ApiStore from 'store/ApiStore';
import { HTTPMethod } from 'store/ApiStore';

import {
    IProductsStore,
    GetProductsListParams,
} from './types';
import { Meta } from "utils/meta.ts";
import {
    makeObservable,
    observable,
    computed,
    action,
    runInAction,
    reaction
} from "mobx";
import {normalizeProductItem, ProductItemModel} from "store/models/products";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "store/models/shared/collection.ts";
import rootStore from "store/RootStore";


type PrivateFields = '_list' | '_meta';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api';

export default class ProductsStore implements IProductsStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);
    private _list: CollectionModel<string, ProductItemModel[]> = getInitialCollectionModel();
    // состояние загрузки
    private _meta: Meta = Meta.initial;
    private _page: number = 0;
    private _hasMore = true;
    private _search = '';

    constructor() {
        this._qpReaction = reaction(
            () => rootStore.query.getParam('search'),
            (search) => {
                console.log("search value change", search);
                this.reset();
                this._search = search;
                this.getProductsList({}, '/products');
            }
        );
        makeObservable<ProductsStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _search: observable,
            list: computed,
            meta: computed,
            search: computed,
            reset: action,
            getProductsList: action,
            setSearch: action
        });
    }

    get hasMore() {
        return this._hasMore;
    }

    get search() {
        return this._search;
    }

    setSearch = (value: string) => {
        this._search = value;
        console.log('changed search', this._search)
    };

    get list(): ProductItemModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProductsList(
        params: GetProductsListParams,
        endpoint: string,
        additionalParams: boolean = true
    ): Promise<void> {
        params.populate = ['images', 'productCategory']
        if (additionalParams) {
            if (this._search) {
                params.filters = {
                    title: {
                        $containsi: this._search,
                    }
                }
            }
            params.pagination = {
                start: this._page * 25,
                limit: 25
            }
        }
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
                console.log('response not success');
            }
            try {
                this._meta = Meta.success;
                const response_data = response.data.data;
                let elements;
                if (response_data.length) {
                    elements = response_data.map(normalizeProductItem);
                } else {
                    elements = [response_data].map(normalizeProductItem);
                }
                this._list = normalizeCollection(elements, (el) => el.id);
                return;
            } catch (e) {
                console.log('error', e);
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
            }
        })
    }

    reset(): void {
        this._list = getInitialCollectionModel();
        this._meta = Meta.initial;
        this._page = 0;
        this._hasMore = true;
    }

    destroy(): void {
        console.log('destroyed')
        this.reset();
        this._qpReaction();
        this._search = "";
    }
}
