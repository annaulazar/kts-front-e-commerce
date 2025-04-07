import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Slider from "./components/Slider";
import ProductInfo from "./components/ProductInfo";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import Text from "components/Text"
import styles from './Product.module.scss'
import { observer } from "mobx-react-lite";
import { useLocalStore } from "utils/useLocalStore.ts";
import ProductsStore from "store/ProductsStore";

const ProductPage = () => {
    const { id } = useParams();
    const productStore = useLocalStore(() => new ProductsStore());

    useEffect(() => {
        productStore.getProductsList({},
            `/products/${id}`,
            false);
    }, [productStore]);


    const navigate = useNavigate();
    const returnHandler = () => {
        navigate(`/`);
    };

    if (!productStore.list[0]) {
        return null;
    }

    return (
        <div className='container'>
            <div className={styles.product__nav} onClick={() => returnHandler()}>
                <ArrowDownIcon className='icon_left'/>
                <Text tag='span'>Назад</Text>
            </div>
            <div className={styles.product}>
                <Slider className={styles.product__block} product={productStore.list[0]} />
                <ProductInfo className={styles.product__block} product={productStore.list[0]} />
            </div>
        </div>
    )
};

export default observer(ProductPage);