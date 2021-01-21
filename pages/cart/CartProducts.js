import React, { useContext } from 'react';

import { CartContext } from '../../src/contexts/CartContext';

import Button from '@material-ui/core/Button';

export default function CartProducts() {
  const { cartItems, removeProduct } = useContext(CartContext);

  return (
    <div>
      {cartItems.map((product) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <div>
            <Button onClick={() => removeProduct(product)}>Remove Item</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
