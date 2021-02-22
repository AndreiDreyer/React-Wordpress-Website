import React, { useContext } from 'react';

import CartProducts from './CartProducts';
import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';
import Footer from '../../components/Footer';

import { CartContext } from '../../src/contexts/CartContext';

import Head from 'next/head';

import { makeStyles } from '@material-ui/core/styles';
import { getMenu } from '../../lib/api';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.down(765)]: {
      position: 'relative',
      minHeight: '100%',
    },
  },
  root: {
    display: 'flex',

    [theme.breakpoints.down(765)]: {
      paddingBottom: '75px',
    },
  },
  cartContainer: {
    marginTop: '75px',
    marginLeft: '10%',
    marginRight: '10%',
    width: '100%',
    [theme.breakpoints.down(765)]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },
}));

export default function Cart({ menuItems }) {
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);

  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
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
      <Footer />
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
