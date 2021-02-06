import React, { useContext, useState } from 'react';

import { CartContext } from '../../src/contexts/CartContext';
import { getMenu } from '../../lib/api';
import { fetchHelper } from '../../src/utils';
import Form from '../../components/CheckoutForm';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'next/link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  gridItem: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export default function Checkout() {
  const { total, cartItems, checkout, handleCheckout } = useContext(CartContext);

  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={12} className={classes.gridItem}>
        <h1>Checkout Page</h1>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <p>Total: {total}</p>
      </Grid>
      <div>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h4" component="h4">
            Shipping Address
          </Typography>
          <Form />
        </Grid>
      </div>
    </Grid>
  );
}

export async function getServerSideProps() {
  const menuItems = await getMenu();
  return {
    props: {
      menuItems: menuItems,
    },
  };
}
