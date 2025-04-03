import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import Slider from "./components/Slider";
import ProductInfo from "./components/ProductInfo";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text"
import style from './Product.module.scss'

export type Prod = {
    title: string;
    description: string;
    price: string;
    images: String[];
}

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Prod | null>(null)

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
                <Slider className={style.block} images={product.images} />
                <ProductInfo className={style.block} product={product} />
            </div>
        </div>
    )
};

export default Product;