import React, { useContext } from 'react';

import { CartContext } from '../../src/contexts/CartContext';

export default function CartProducts() {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      {cartItems.map((product) => (
        <div>{product.name}</div>
      ))}
    </div>
  );
}
