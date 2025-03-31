import './Products.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import ProductItem from "./components/ProductItem";

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: 'https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory'
            });
            console.log(result)
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
        <div className='items'>
            {products.map(product =>
                <ProductItem key={product.id} product={product} />
            )}
        </div>
    )
};

export default Products;