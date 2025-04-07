import { useEffect, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import Text from 'components/Text'
import style from './Products.module.scss'
import { useLocalStore } from "utils/useLocalStore.ts";
import ProductsStore from 'store/ProductsStore'
import {observer} from "mobx-react-lite";
import {Search} from "./components/Search";
import {useSearchParams} from "react-router";

const ProductsPage = () => {
    const productsStore = useLocalStore(() => new ProductsStore());
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        productsStore.getProductsList({},
            '/products');
    }, [productsStore]);

    const handleClick = () => {
        productsStore.getProductsList({},
            '/products');
    }

    const handleSearch = (value) => {
        setSearchParams({'search' : value});
        productsStore.setSearch(value);
    }

    return (
        <div className='container'>
            <div className={style.layout}>
                <div className={style.title}>
                    <Text tag='h1'>Products</Text>
                    <Text view='p-20' color='secondary'>We display products based on the latest products we have, if you want
                        to see our old products please enter the name of the item</Text>
                </div>

                <Search onSearch={handleSearch} onClick={handleClick}/>

                <div className={style.items}>
                    {productsStore.list.map(product =>
                        <ProductCard key={product.id} product={product}/>
                    )}
                </div>
            </div>
        </div>
    )
};

export default observer(ProductsPage);