import React, { useContext } from 'react';

import CartProducts from './CartProducts';
import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';

import { CartContext } from '../../src/contexts/CartContext';

import Link from 'next/link';
import Head from 'next/head';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getMenu } from '../../lib/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  cartContainer: {
    marginTop: '75px',
    marginLeft: '10%',
    marginRight: '10%',
    width: '100%',
  },
}));

export default function Cart({ menuItems }) {
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>
        <title>The Salty Zebra</title>
      </Head>
      <TopNavBar />
      <Navigation menuItems={menuItems} />
      <div className={classes.cartContainer}>
        <div>
          <h1>Your Cart</h1>
        </div>
        <div>{cartItems.length > 0 ? <CartProducts /> : <div>Your Cart is empty</div>}</div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const menuItems = await getMenu();

  return {
    props: {
      menuItems,
    },
  };
}
