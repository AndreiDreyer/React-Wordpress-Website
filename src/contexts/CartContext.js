import React, { createContext, useEffect, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cartItems: []
  });

  const increase = (payload) => {
    console.log('INCREASE');
    dispatch({ type: 'INCREASE', payload });
  };

  const decrease = (payload) => {
    console.log('DECREASE');
    dispatch({ type: 'DECREASE', payload });
  };

  const addProduct = (payload) => {
    console.log('ADD_ITEM');
    dispatch({ type: 'ADD_ITEM', payload });
  };

  const removeProduct = (payload) => {
    console.log('REMOVE_ITEM');
    dispatch({ type: 'REMOVE_ITEM', payload });
  };

  const clearCart = () => {
    console.log('CLEAR');
    dispatch({ type: 'CLEAR' });
  };

  const handleCheckout = () => {
    console.log('CHECKOUT', state);
    dispatch({ type: 'CHECKOUT' });
  };

  const initialise = (payload) => {
    console.log('INITIALISE', payload);
    dispatch({ type: 'INITIALISE', payload });
  };


  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const payload = {
      cartItems,
      ...sumItems(cartItems),
      checkout: false
    }

    initialise(payload);
  }, []);

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
