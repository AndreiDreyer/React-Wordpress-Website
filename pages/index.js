import React from 'react';

import Navigation from '../components/Navigation';

import Head from 'next/head';

import { Grid } from '@material-ui/core';
import { getMenu, getBackgroundImages } from '../lib/api';

import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  phoneButton: {
    marginRight: 10,
  },
  menuGrid: {
    height: '100%',
    width: '100%',
    margin: 0,
    backgroundColor: '#F9F3DE',
  },
  rotatingImagesContainer: {
    height: '100%',
    width: '100%',
  },
  rotatingImages: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  carouselContainer: {
    width: '100%',
    height: '100%',
    '& .CarouselItem': {
      height: '100%',
      '& div': {
        height: '100%',
      },
    },
  },
});

export default function Home({ menuItems, backgroundImageSrcs }) {
  const classes = useStyles();

  return (
    <div className={classes.menuGrid}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://www.paypal.com/sdk/js?client-id=AUsPuJjZe3gcSsc0U7mt_tCdRiCZresx96fiv1FNIoRukORqqWMVQs074sCdd41aSWqcp2mGzvp2HKbh&currency=USD"></script>
      </Head>
      <Grid container className={classes.menuGrid}>
        <Grid item>
          <Navigation menuItems={menuItems} />
        </Grid>
        <Grid item className={classes.menuGrid}>
          <div className={classes.rotatingImagesContainer}>
            <Carousel className={classes.carouselContainer} autoPlay={true} navButtonsAlwaysInvisible={true} indicators={false} interval={6000}>
              {backgroundImageSrcs.map((image) => (
                <img key={image} src={image} className={classes.rotatingImages} />
              ))}
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getStaticProps() {
  const menuItems = await getMenu();
  const backgroundImages = await getBackgroundImages();
  const backgroundImageSrcs = getSrcs(backgroundImages);
  return {
    props: {
      menuItems,
      backgroundImageSrcs,
    },
  };
}

function getSrcs(imageHtml) {
  console.log('Image html', typeof imageHtml);
  let m;
  let urls = [];
  const regexPattern = /<img[^>]+src="(https:\/\/([^">]+))/g;

  while ((m = regexPattern.exec(imageHtml))) {
    console.log('rawr');
    urls.push(m[1]);
  }

  return urls;
}
