import React from 'react';
import Navigation from '../../components/Navigation';
import { getMenu, getProducts } from '../../lib/api';
import TopNavBar from '../../components/TopNavbar';

import Link from 'next/link';
import Head from 'next/head';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Carousel from 'react-material-ui-carousel';

import Youtube from 'react-youtube';

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
    display: 'block',
    width: '100%',
    height: '100%',
    margin: 'auto',
    '& .CarouselItem': {
      height: '100%',
      width: '100%',
      '& div': {
        height: '100%',
        width: '100%',
      },
    },
  },
  promotionItem: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '100%',
    width: '100%',
    '& div': {
      width: '100%',
      '& iframe': {
        height: '100%',
        width: '100%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
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
  promotionVideo: {
    width: '100% !important',
    float: 'left',
  },
  promotionInfo: {
    width: '47.5% !important',
    float: 'right',
    marginLeft: '2rem',
  },
  videoInfo: {
    display: 'flex',
    flexGrow: '1',
    flexWrap: 'nowrap',
    height: '24px',
    maxHeight: '24px',
    '& hr': {
      margin: theme.spacing(0, 0.5),
      width: '2px',
      maxHeight: '24px',
    },
  },
  videoLocation: {
    display: 'flex',
    width: '45%',
  },
  videoDate: {
    display: 'flex',
    width: '45%',
  },
  promoTitle: {
    width: '100%',
    marginBottom: '1rem',
    fontFamily: 'Oswald Regular',
  },
  productTitle: {
    maxHeight: '75px',
  },
  videoDescription: {
    overflowY: 'hidden',
  },
}));

export default function Shop({ products, menuItems }) {
  const classes = useStyles();
  const theme = useTheme();

  const opts = {
    width: '100%',
  };

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
        {ipadUp ? (
          <GridList cellHeight={250} cols={numCols()} spacing={24} className={classes.gridItem}>
            <GridListTile cols={numCols()} rows={2}>
              <div className={classes.promoTitle}>
                <h1>Promotions</h1>
              </div>
              <Carousel autoPlay={false} interval={2000} className={classes.promotionContainer}>
                {products.map((product) => {
                  if (product.featured) {
                    return (
                      <div className={classes.promotionItem}>
                        <Youtube videoId={product.videoId} className={classes.promotionVideo} />
                        <div className={classes.promotionInfo}>
                          <h3>{product.name}</h3>
                          <Grid container alignItems="center" className={classes.videoInfo} justify="center">
                            <div className={classes.videoLocation}>
                              <LocationOnIcon />
                              {product.promoLocation}
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <div className={classes.videoDate}>
                              <EventIcon />
                              {product.promoDate}
                            </div>
                          </Grid>
                          <p className={classes.videoDescription}>{product.promoDescription}</p>
                        </div>
                      </div>
                    );
                  }
                })}
              </Carousel>
            </GridListTile>
            <GridListTile cols={numCols()} cellHeight={25} className={classes.productTitle}>
              <div className={classes.promoTitle}>
                <h1>Products</h1>
              </div>
            </GridListTile>
            {products.map((product) => {
              console.log(product.images);
              if (!product.featured) {
                return (
                  <GridListTile key={product.id}>
                    <img src={product.images[0].src} className={classes.productImage} />
                    <GridListTileBar title={product.name} subtitle={`From ${product.priceRange[0]} - ${product.priceRange[1]}`} actionIcon={productBtn(product.id, product.slug)} />
                  </GridListTile>
                );
              }
            })}
          </GridList>
        ) : (
          <GridList cellHeight={200} cols={numCols()} spacing={24} className={classes.gridItemm}>
            <GridListTile rows={3}>
              <div className={classes.promoTitle}>
                <h1>Promotions</h1>
              </div>
              <Carousel autoPlay={false} interval={2000} className={classes.promotionContainer}>
                {products.map((product) => {
                  if (product.featured) {
                    return (
                      <div key={product.id}>
                        <h2>{product.name}</h2>
                        <Grid container alignItems="center" justify="center" className={classes.videoInfo}>
                          <div className={classes.videoLocation}>
                            <LocationOnIcon />
                            {product.promoLocation}
                          </div>
                          <Divider orientation="vertical" flexItem />
                          <div className={classes.videoDate}>
                            <EventIcon />
                            {product.promoDate}
                          </div>
                        </Grid>
                        <p>{product.promoShortDescription}</p>
                        <Youtube videoId={product.videoId} opts={opts} />
                      </div>
                    );
                  }
                })}
              </Carousel>
            </GridListTile>
            <GridListTile cellHeight={25} className={classes.productTitle}>
              <div className={classes.promoTitle}>
                <h1>Products</h1>
              </div>
            </GridListTile>
            {products.map((product) => {
              if (!product.featured) {
                return (
                  <GridListTile key={product.id} cols={1}>
                    <img src={product.images[0].src} className={classes.productImage} />
                    <GridListTileBar title={product.name} subtitle={`From ${product.priceRange[0]} - ${product.priceRange[1]}`} actionIcon={productBtn(product.id, product.slug)} />
                  </GridListTile>
                );
              }
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
  const videoIdRegex = /Video: ([A-z0-9,.!?@#$%^&*()]+)/g;
  const locationRegex = /Location: ([A-z0-9,.!?/\s]+)/g;
  const dateRegex = /Date: ([A-z0-9/]+)/g;
  const descriptionRegex = /Description: ([A-z0-9.,!?/\s]+)/g;
  const shortDescriptionRegex = /<p>([A-z0-9,.!?/\s]+)/g;

  const rangeProducts = products.map((product) => {
    let priceRange = [];
    let videoId, location, date, description, shortDescription;

    if (product.featured) {
      if ((m = videoIdRegex.exec(product.description))) {
        videoId = m[1];
      }

      if ((m = locationRegex.exec(product.description))) {
        location = m[1];
      }

      if ((m = dateRegex.exec(product.description))) {
        date = m[1];
      }

      if ((m = descriptionRegex.exec(product.description))) {
        description = m[1];
      }

      if ((m = shortDescriptionRegex.exec(product.short_description))) {
        shortDescription = m[1];
      }

      console.log('Description: ', description);
      console.log('Date: ', date);
      console.log('Location: ', location);
      console.log('Short Description: ', shortDescription);

      return {
        ...product,
        videoId: videoId,
        promoDescription: description,
        promoDate: date,
        promoLocation: location,
        promoShortDescription: shortDescription,
      };
    }

    while ((m = regexPattern.exec(product.price_html))) {
      priceRange.push(m[1]);
    }

    return {
      ...product,
      priceRange: priceRange,
    };
  });

  // console.log(rangeProducts);

  return rangeProducts;
}
