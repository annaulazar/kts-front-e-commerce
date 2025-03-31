import './ProductItem.scss';
import Card from "../../../../../components/Card";
import Text from "../../../../../components/Text";
import Button from "../../../../../components/Button";
import React from "react";

const ProductItem = ({product}) => {
    return (
        <Card key={product.id} image={product.images[0].url}
          captionSlot={<Text tag='p'>{product.category}</Text>}
          title={product.title}
          subtitle={product.description}
          contentSlot={
            // <Text tag='h4' className='item_price'>
            //     <Text tag='span'>$</Text>
            //     <Text tag='span'>{product.price}</Text>
            // </Text>
              <Text tag='h4'>
                  ${product.price}
              </Text>
          }
          actionSlot={<Button>В корзину</Button>}
        />
    )
};

export default ProductItem;