import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router";
import Slider from "./components/Slider";
import ProductInfo from "./components/ProductInfo";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text"
import styles from './Product.module.scss'
import { Product } from './types.ts'
import {observer} from "mobx-react-lite";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null)
    const navigate = useNavigate();
    const returnHandler = () => {
        navigate(`/`);
    };

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: `https://front-school-strapi.ktsdev.ru/api/products/${id}?populate[0]=images&populate[1]=productCategory`
            });
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
            <div className={styles.product__nav} onClick={() => returnHandler()}>
                <ArrowDownIcon className='icon_left'/>
                <Text tag='span'>Назад</Text>
            </div>
            <div className={styles.product}>
                <Slider className={styles.product__block} images={product.images} />
                <ProductInfo className={styles.product__block} product={product} />
            </div>
        </div>
    )
};

export default ProductPage;