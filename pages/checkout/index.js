import React, { useContext, useState } from 'react';

import { CartContext } from '../../src/contexts/CartContext';
import { getMenu } from '../../lib/api';
import Form from '../../components/CheckoutForm';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';
import Footer from '../../components/Footer';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down(765)]: {
      position: 'relative',
    },
    display: 'flex',
    flexWrap: 'wrap',
  },
  contentWrap: {
    [theme.breakpoints.down(765)]: {
      paddingBottom: '75px',
    },
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
  card: {
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: 'middle',
    backgroundImage: 'url(./_MG_0509.jpg)',
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundSize: 'cover',
    [theme.breakpoints.down('768')]: {
      marginTop: 75,
    },
    [theme.breakpoints.up('768')]: {
      marginTop: 75,
      height: '150%',
    },
    [theme.breakpoints.up('1020')]: {
      marginTop: 150,
      marginLeft: 200,
      height: '150%',
    },
    [theme.breakpoints.up('1025')]: {
      marginTop: 75,
      marginLeft: 0,
    },
  },
  second: {
    background: 'rgba(31,65,69, 0.0)',
    border: 0,
    paddingLeft: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);',
    [theme.breakpoints.up('1020')]: {
      marginLeft: 0,
      marginTop: 20,
    },
    heading: {
      fontFamily: 'Oswald Regular',
    },
  },
}));

export default function Checkout({ menuItems }) {
  const { total, cartItems, checkout, handleCheckout } = useContext(CartContext);

  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.root}>
      <TopNavBar></TopNavBar>
      <Navigation menuItems={menuItems}></Navigation>
      <Container maxWidth="lg" className={classes.contentWrap}>
        <Card className={classes.card}>
          <CardContent>
            <Card className={classes.second}>
              <Grid item xs={12} className={classes.gridItem}>
                <Typography className={classes.heading} variant="h2" component="h1">
                  Checkout
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <p>Total:&nbsp;{total}</p>
              </Grid>
              <div>
                <Grid item xs={12} className={classes.gridItem}>
                  <Typography className={classes.heading} variant="h4" component="h4">
                    Address
                  </Typography>
                  <Form />
                </Grid>
              </div>
            </Card>
          </CardContent>
        </Card>
      </Container>
      <Footer />
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
