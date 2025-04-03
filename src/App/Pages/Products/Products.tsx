import {useEffect, useState} from "react";
import axios from "axios";
import ProductItem from "./components/ProductItem";
import Text from 'components/Text'
import style from './Products.module.scss'

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory'
            });
            setProducts(result.data.data.map(raw => ({
                id: raw.documentId,
                title: raw.title,
                description: raw.description,
                price: raw.price,
                category: raw.productCategory.title,
                images: raw.images
            })))
        }

        fetch();
    }, []);

    return (
        <div className='container'>
            <div className={style.layout}>
                <div className={style.title}>
                    <Text tag='h1'>Products</Text>
                    <Text view='p-20' color='secondary'>We display products based on the latest products we have, if you want
                        to see our old products please enter the name of the item</Text>
                </div>
                <div className={style.items}>
                    {products.map(product =>
                        <ProductItem key={product.id} product={product}/>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Products;