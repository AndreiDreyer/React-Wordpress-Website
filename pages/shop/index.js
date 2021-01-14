import React from 'react';
import Navigation from '../../components/Navigation';
import { getMenu, getProducts } from '../../lib/api';

import Head from 'next/head';
import { Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

export default function Shop({ products, menuItems }) {
  const classes = useStyles();

  console.log(products);

  return (
    <React.Fragment>
      <Head>
        <title>The Salty Zebra</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navigation menuItems={menuItems} />
      <Container maxWidth="lg">
        <section>
          {products.map((product) => {
            return (
              <div key={product.name}>
                <p>Product: {product.name}</p>
              </div>
            );
          })}
        </section>
      </Container>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const products = await getProducts();
  const menuItems = await getMenu();
  return {
    props: {
      products,
      menuItems,
    },
  };
}
