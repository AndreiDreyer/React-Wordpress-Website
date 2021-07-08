import React from 'react';

import Navigation from '../components/Navigation';

import Head from 'next/head';
import Link from 'next/link';

import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

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
      </Head>

      <AppBar className="homeTopNavBar" elevation={0}>
        <CssBaseline />
        <Toolbar disableGutters={true} className="homeTopNavBar">
          <div className="homeTopNavBarContainer">
            <div className="homeTopNavBarItem">
              <Link href="/cart">
                <ShoppingCartIcon className="homeTopNavBarIcon" />
              </Link>
              <a target="_blank" href="http://www.facebook.com/the.salty.zebra.co/" className="homeTopNavBarIcon mediaIcon">
                {/* <FacebookIcon className="homeTopNavBarIcon mediaIcon" /> */}
                <FacebookIcon className="mediaIcon" />
              </a>
              <a target="_blank" href="https://www.instagram.com/the.salty.zebra.co/?hl=enyou" className="homeTopNavBarIcon mediaIcon">
                <InstagramIcon className="mediaIcon" />
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.menuGrid}>
        <Grid item>
          <Navigation menuItems={menuItems} color="white" />
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
      <div className="footer">
        <div>
          <FacebookIcon className="footerIcon" />
          <InstagramIcon className="footerIcon" />
        </div>
      </div>
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
