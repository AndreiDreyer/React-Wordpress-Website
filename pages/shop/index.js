import React from 'react';
import Navigation from '../../components/Navigation';
import { getMenu, getProducts } from '../../lib/api';
import TopNavBar from '../../components/TopNavbar';

import Link from 'next/link';
import Head from 'next/head';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Carousel from 'react-material-ui-carousel';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  productSection: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productsContainer: {
    marginLeft: '1rem',
    marginRight: '1rem',
    marginTop: '75px',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '8rem',
      marginRight: '8rem',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 768,
    },
  },
  promotionContainer: {
    width: '100%',
    paddingLeft: '12px',
    paddingRight: '12px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  promotionItem: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  productItem: {
    margin: '1rem 3rem 4rem 3rem',
    textAlign: 'center',
    [theme.breakpoints.down(1024)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  productButton: {
    color: 'white',
  },
  gridItem: {
    width: '100%',
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
  },
}));

export default function Shop({ products, menuItems }) {
  const classes = useStyles();
  const theme = useTheme();

  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const xlg = useMediaQuery(theme.breakpoints.down('xl'));

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const ipad = useMediaQuery(theme.breakpoints.down(769));
  const ipadUp = useMediaQuery(theme.breakpoints.up(768));

  const numCols = () => {
    if (ipad && ipadUp) {
      return 2;
    } else if (sm) {
      return 1;
    } else if (md) {
      return 2;
    } else if (xlg) {
      return 3;
    }
  };

  const productBtn = (id, slug) => (
    <Link href={`/shop/${id}?slug=${slug}`}>
      <Button className={classes.productButton}>View Product</Button>
    </Link>
  );

  return (
    <div className={classes.productSection}>
      <Head>
        <title>The Salty Zebra</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <TopNavBar />
      <Navigation menuItems={menuItems} />
      <div className={classes.productsContainer}>
        <Carousel autoPlay={false} interval={2000} className={classes.promotionContainer}>
          <Button className={classes.promotionItem}>A</Button>
        </Carousel>
        {ipadUp ? (
          <GridList cellHeight={250} cols={numCols()} spacing={24} className={classes.gridItem}>
            {products.map((product) => {
              console.log(product.images);
              return (
                <GridListTile key={product.id}>
                  <img src={product.images[0].src} className={classes.productImage} />
                  <GridListTileBar title={product.name} subtitle={`From ${product.priceRange[0]} - ${product.priceRange[1]}`} actionIcon={productBtn(product.id, product.slug)} />
                </GridListTile>
              );
            })}
          </GridList>
        ) : (
          <GridList cellHeight={200} cols={numCols()} spacing={24}>
            {products.map((product) => {
              return (
                <GridListTile key={product.id} cols={1}>
                  <img src={product.images[0].src} className={classes.productImage} />
                  <GridListTileBar title={product.name} subtitle={`From ${product.priceRange[0]} - ${product.priceRange[1]}`} actionIcon={productBtn(product.id, product.slug)} />
                </GridListTile>
              );
            })}
          </GridList>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const productsRaw = await getProducts();
  const menuItems = await getMenu();
  const products = getPriceRange(productsRaw);
  return {
    props: {
      products,
      menuItems,
    },
  };
}

function getPriceRange(products) {
  let m;
  const regexPattern = /;<\/span[^>]*>(.+?)<\/bdi>/g;

  const rangeProducts = products.map((product) => {
    let priceRange = [];
    while ((m = regexPattern.exec(product.price_html))) {
      priceRange.push(m[1]);
    }

    return {
      ...product,
      priceRange: priceRange,
    };
  });

  return rangeProducts;
}
