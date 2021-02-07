import React from 'react';
import { Hidden, Paper } from '@material-ui/core';

import Navigation from '../components/Navigation';

import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { Grid } from '@material-ui/core';
import { getMenu, getBackgroundImages } from '../lib/api';

import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles({
  appBar: {
    background: 'transparent',
    boxShadow: 'none',
  },
  phoneButton: {
    marginRight: 10,
  },
  menuGrid: {
    height: '100vh',
    margin: 0,
  },
  rotatingImages: {
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
  },
});

export default function Home({ menuItems, backgroundImageSrcs }) {
  const classes = useStyles();

  console.log('Background: ', backgroundImageSrcs);
  return (
    <Grid container spacing={0} direction="column" className={classes.menuGrid}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://www.paypal.com/sdk/js?client-id=AUsPuJjZe3gcSsc0U7mt_tCdRiCZresx96fiv1FNIoRukORqqWMVQs074sCdd41aSWqcp2mGzvp2HKbh&currency=USD"></script>
      </Head>
      <Grid item container>
        <Grid item>
          <Navigation menuItems={menuItems} />
        </Grid>
        <Grid item>
          <div className={classes.rotatingImages}>
            <Carousel navButtonsAlwaysInvisible={true} indicators={false}>
              {backgroundImageSrcs.map((image) => (
                <img key={image} src={image} className={classes.rotatingImages} />
              ))}
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </Grid>
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
