import { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Text from 'components/Text'
import style from './Products.module.scss'
import { useLocalStore } from "utils/useLocalStore.ts";
import ProductsStore from 'store/ProductsStore'
import {observer} from "mobx-react-lite";

const ProductsPage = () => {
    const productsStore = useLocalStore(() => new ProductsStore());

    useEffect(() => {
        productsStore.getProductsList({},
            '/products');
    }, [productsStore]);

    return (
        <div className='container'>
            <div className={style.layout}>
                <div className={style.title}>
                    <Text tag='h1'>Products</Text>
                    <Text view='p-20' color='secondary'>We display products based on the latest products we have, if you want
                        to see our old products please enter the name of the item</Text>
                </div>
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