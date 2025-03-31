import './ProductItem.scss';
import Card from "components/Card";
import Text from "components/Text";
import Button from "components/Button";
import React from "react";
import {useNavigate} from "react-router";


const ProductItem = ({product}) => {
    const navigate = useNavigate();
    const cardHandler = (id): void => {
        navigate(`/products/${id}`);
    };

    return (
        <Card key={product.id} image={product.images[0].url}
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

export default ProductItem;