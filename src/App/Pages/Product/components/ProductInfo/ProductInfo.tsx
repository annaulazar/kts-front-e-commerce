import React from "react";
import style from './ProductInfo.module.scss';
import Text from "components/Text";
import Button from "components/Button";

const ProductInfo = ({product, className}) => {
    return (
        <div className={`${className} ${style.info}`}>
            <div className={style.info_description}>
                <Text view='title'>{product.title}</Text>
                <Text view='p-20' color='secondary'>{product.description}</Text>
            </div>
            <div className={style.info_purchase}>
                <Text view='title'>${product.price}</Text>
                <div className={style.buttons}>
                    <Button>Buy Now</Button>
                    <Button>Add to Cart</Button>
                </div>
            </div>
        </div>
    )
};

export default ProductInfo;