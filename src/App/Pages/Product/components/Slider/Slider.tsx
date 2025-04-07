import style from './Slider.module.scss';
import React from "react";
import {ProductItemModel} from "store/models/products";

type ProductProps = {
    product: ProductItemModel,
    className?: string
};
const Slider: React.FC<ProductProps> = ({product, className}) => {
    return (
        <div className={`${className} ${style.slider}`}>
            <img src={product.images[0]} />
        </div>
    )
};

export default Slider;