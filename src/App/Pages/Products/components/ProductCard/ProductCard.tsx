import React from "react";
import {useNavigate} from "react-router";
import Card from "components/Card";
import Text from "components/Text";
import Button from "components/Button";
import style from './ProductICard.module.scss';
import {ProductItemModel} from "../../../../../store/models/products";

type ProductProps = {
    product: ProductItemModel
};

const ProductCard: React.FC<ProductProps> = ({product}) => {
    const navigate = useNavigate();
    const cardHandler = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <Card key={product.id} image={product.images[0]}
          captionSlot={<Text tag='p'>{product.category}</Text>}
          title={product.title}
          subtitle={product.description}
          contentSlot={
              <Text tag='h4'>${product.price}</Text>
          }
          actionSlot={<Button>Add to Cart</Button>}
          onClick={() => cardHandler(product.id)}
        />
    )
};

export default ProductCard;