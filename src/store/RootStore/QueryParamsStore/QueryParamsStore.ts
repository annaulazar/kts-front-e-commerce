import {action, computed, makeObservable, observable} from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
    private _params: qs.ParsedQs = {};
    private _search: string = '';

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            setSearch: action,
            // params: computed
        });
    }

    getParam(
        key: string
    ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
        console.log('param getted', this._params[key])
        return this._params[key];
    }

    setSearch(search: string) {
        search = search.startsWith('?') ? search.slice(1) : search;

        if (this._search !== search) {
            console.log('search global store', search)
            this._search = search;
            const parsed_params = qs.parse(search)
            console.log('parsed_params', parsed_params)
            this._params = qs.parse(search);
        }
    }
}
