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

import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { PlayCircleFilledWhite } from '@material-ui/icons';

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
    [theme.breakpoints.up("1020")]: {
      // marginLeft: theme.spacing(22),
    },
  },
  card: {
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: "middle",
    backgroundImage: 'url(./_MG_0509.jpg)',
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundSize: 'cover',
    // boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    [theme.breakpoints.down("768")]: {
      marginTop: 75,
    },
    [theme.breakpoints.up("768")]: {
      marginTop: 75,
      height: '150%',
    },
    [theme.breakpoints.up("1020")]: {
      marginTop: 150,
      marginLeft: 200,
      height: '150%',
    },
    [theme.breakpoints.up("1025")]: {
      marginTop: 75,
      marginLeft: 0,
    },
  },
  second: {
    background: 'rgba(31,65,69, 0.0)',
    border: 0,
    paddingLeft: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);",
    [theme.breakpoints.up("1020")]: {
      marginLeft: 0,
      marginTop: 20,
    },
    heading: {
      fontFamily: 'Oswald Regular',
    },
  },
}));

export default function Checkout({menuItems}) {
  const { total, cartItems, checkout, handleCheckout } = useContext(CartContext);

  const classes = useStyles();

  return (
    <Grid container direction="row">
      <TopNavBar></TopNavBar>
      <Navigation menuItems={menuItems}></Navigation>
      <Container maxWidth="lg">
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
