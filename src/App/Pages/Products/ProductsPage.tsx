import { useEffect, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import Text from 'components/Text'
import style from './Products.module.scss'
import { useLocalStore } from "utils/useLocalStore.ts";
import ProductsStore from 'store/ProductsStore'
import {observer} from "mobx-react-lite";
import rootStore from "store/RootStore";
import {Search} from "./components/Search";

const ProductsPage = () => {
    const productsStore = useLocalStore(() => new ProductsStore());
    let value= rootStore.query.getParam('search');

    useEffect(() => {
        productsStore.getProductsList({},
            '/products');
    }, [productsStore]);

    const handleChangeValue = useCallback(
        (e) => {
            rootStore.query.setSearch(e.target.value);
            value = rootStore.query.getParam('search');
        }
    );

    return (
        <div className='container'>
            <div className={style.layout}>
                <div className={style.title}>
                    <Text tag='h1'>Products</Text>
                    <Text view='p-20' color='secondary'>We display products based on the latest products we have, if you want
                        to see our old products please enter the name of the item</Text>
                </div>

                <Search value={productsStore.search} onSearch={productsStore.setSearch} />

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