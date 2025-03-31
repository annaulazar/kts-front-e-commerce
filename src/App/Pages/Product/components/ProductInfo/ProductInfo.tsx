import './ProductInfo.scss';
import Text from "components/Text";
import React from "react";
import Button from "components/Button";

const ProductInfo = ({product, className}) => {
    return (
        <div className={`${className} info`}>
            <div className='info_description'>
                <Text view='title'>{product.title}</Text>
                <Text view='p-20' color='secondary'>{product.description}</Text>
            </div>
            <div className='info_purchase'>
                <Text view='title'>${product.price}</Text>
                <div className='buttons'>
                    <Button>Buy Now</Button>
                    <Button>Add to Cart</Button>
                </div>
            </div>
        </div>
    )
};

export default ProductInfo;