import {useEffect, useCallback, useRef} from "react";
import ProductCard from "./components/ProductCard";
import Text from 'components/Text'
import style from './Products.module.scss'
import { useLocalStore } from "utils/useLocalStore.ts";
import ProductsStore from 'store/ProductsStore'
import {observer} from "mobx-react-lite";
import {Search} from "./components/Search";
import {useSearchParams} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "components/Loader";

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

    const nextScroll = () => {
        if (!productsStore.hasMore) {
            return;
        }
        productsStore.getProductsList({},
            '/products');
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

                <InfiniteScroll
                    hasChildren={true}
                    next={nextScroll}
                    hasMore={productsStore.hasMore}
                    loader={
                        <div className={style.loader}>
                            <Loader />
                        </div>
                    }
                    dataLength={productsStore.list.length}
                >
                    <div className={style.items}>
                        {productsStore.list.map(product =>
                            <ProductCard key={product.id} product={product}/>
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
};

export default observer(ProductsPage);