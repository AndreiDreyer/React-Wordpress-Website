import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Link from 'next/link';

import Button from '@material-ui/core/Button';

import { CartContext } from '../../src/contexts/CartContext';

import { getProducts, getProduct } from '../../lib/api';

export default function Product({ productData }) {
  const { addProduct, cartItems, increase } = useContext(CartContext);

  console.log('rendering');
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <div>
      <Head>
        <title>{productData.name}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div>
          <div>{productData.name}</div>
          {isInCart(productData) && (
            <Button variant="outlined" onClick={() => increase(productData)}>
              Increase
            </Button>
          )}

          {!isInCart(productData) && (
            <Button variant="outlined" onClick={() => addProduct(productData)}>
              Add to cart
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allProducts = await getProducts();

  return {
    paths: allProducts.map((product) => `/shop/${product.id}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getProduct(params.pid);

  return {
    props: {
      productData: data,
    },
  };
}
