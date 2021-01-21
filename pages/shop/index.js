import React from 'react';
import Navigation from '../../components/Navigation';
import { getMenu, getProducts } from '../../lib/api';

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

const useStyles = makeStyles({
  productSection: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productItem: {
    margin: '1em 0 0 1em',
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
  },
  productGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mediaCard: {
    maxWidth: 345,
  },
  mediaItem: {
    height: 200,
    objectFit: 'contain',
  },
});

export default function Shop({ products, menuItems }) {
  const classes = useStyles();

  console.log(products);

  return (
    <div className={classes.productSection}>
      <Head>
        <title>The Salty Zebra</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navigation menuItems={menuItems} />
      <Grid
        container
        spacing={0}
        className={classes.productGrid}
        alignItems="center"
        justify="center"
      >
        {products.map((product) => {
          console.log(product.images);
          return (
            <Grid
              item
              xs={12}
              md={5}
              lg={3}
              className={classes.productItem}
              key={product.id}
            >
              <Card className={classes.mediaCard}>
                <CardActionArea>
                  <CardMedia
                    className={classes.mediaItem}
                    image={product.images[0].src}
                    title={product.images[0].name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      dangerouslySetInnerHTML={{
                        __html: product.short_description,
                      }}
                    ></Typography>
                    <div>
                      <Typography variant="h5" component="h5">
                        ${product.price}
                      </Typography>
                      <Button variant="outlined">
                        <Link href={`/shop/${product.id}?slug=${product.slug}`}>
                          Purchase
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={12} md={5} lg={3} className={classes.productItem}>
          <p> Test Print 2 </p>
        </Grid>
        <Grid item xs={12} md={5} lg={3} className={classes.productItem}>
          <p>Test Print 3</p>
        </Grid>
        <Grid item xs={12} md={5} lg={3} className={classes.productItem}>
          <p>Test Print 4</p>
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
