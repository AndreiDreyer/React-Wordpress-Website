import React, { useContext } from 'react';
import { CartContext } from '../../src/contexts/CartContext';

import { Link } from 'next/link';
import CartProducts from './CartProducts';

export default function Cart() {
  const {
    total,
    cartItems,
    itemCount,
    clearCart,
    checkout,
    handleCheckout,
  } = useContext(CartContext);

  return (
    <div>
      <div>
        <h1>Cart Page</h1>
      </div>
      <div>
        {cartItems.length > 0 ? (
          <CartProducts />
        ) : (
          <div>Your Cart is empty</div>
        )}
      </div>
      <div>
        {cartItems.length > 0 ? (
          <div>Total: {total}</div>
        ) : (
          <div>Cart is empty </div>
        )}
      </div>
    </div>
  );
}
