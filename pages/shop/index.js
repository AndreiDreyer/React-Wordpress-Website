import React from 'react';
import Navigation from '../../components/Navigation';
import { getMenu, getProducts } from '../../lib/api';
import TopNavBar from '../../components/TopNavbar';

import Link from 'next/link';
import Head from 'next/head';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  productSection: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '75px',
  },
  productItem: {
    margin: '1rem 3rem 4rem 3rem',
    textAlign: 'center',
    [theme.breakpoints.down(1024)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  unEventProductItem: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  gridContainer: {
    width: '100%',
  },
  productGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  someGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    width: '85%',
    [theme.breakpoints.down(1025)]: {
      justifyContent: 'center',
    },
  },
  mediaCard: {
    maxWidth: 375,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      marginRight: '0',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 500,
      maxHeight: 500,
    },
  },
  mediaItem: {
    height: 200,
    objectFit: 'contain',
  },
  cardButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function Shop({ products, menuItems }) {
  const classes = useStyles();

  return (
    <div className={classes.productSection}>
      <Head>
        <title>The Salty Zebra</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <TopNavBar />
      <Navigation menuItems={menuItems} />
      <Grid container spacing={6} className={classes.productGrid} alignItems="center" justify="space-between">
        <Grid item xs={12} className={classes.productItem}>
          <Grid container spacing={1} className={classes.someGrid}>
            {products.map((product) => {
              console.log(product);
              return product.stock_quantity > -10 ? (
                <Grid item xs={12} md={6} lg={3} className={classes.productItem} key={product.id}>
                  <Link href={`/shop/${product.id}?slug=${product.slug}`}>
                    <Card className={classes.mediaCard}>
                      <CardActionArea>
                        <CardMedia className={classes.mediaItem} image={product.images[0].src} title={product.images[0].name} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Link href={`/shop/${product.id}?slug=${product.slug}`}>
                          <Button variant="outlined" className={classes.cardButton}>
                            View Product
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ) : (
                <div></div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
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
