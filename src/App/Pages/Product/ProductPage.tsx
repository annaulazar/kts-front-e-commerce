import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import Slider from "./components/Slider";
import ProductInfo from "./components/ProductInfo";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text"
import style from './Product.module.scss'
import { Product } from './types.ts'

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: `https://front-school-strapi.ktsdev.ru/api/products/${id}?populate[0]=images&populate[1]=productCategory`
            });
            console.log(result);
            const data = result.data.data;
            setProduct({
                title: data.title,
                description: data.description,
                price: data.price,
                images: data.images.map(image => image.url)
            })
        }

        fetch();
    }, []);

    if (!product) {
        return null;
    }

    return (
        <div className='container'>
            <div className='nav'>
                <ArrowDownIcon />
                <Text tag='span'>Назад</Text>
            </div>
            <div className={style.product}>
                <Slider className={style.product__block} images={product.images} />
                <ProductInfo className={style.product__block} product={product} />
            </div>
        </div>
    )
};

export default ProductPage;