import React from 'react';
import { Paper } from '@material-ui/core';

import Navigation from '../components/Navigation';

import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { Grid } from '@material-ui/core';
import { getMenu } from '../lib/api';

import { makeStyles } from '@material-ui/core/styles';

import Carousel from 'react-material-ui-carousel';
import Image from 'material-ui-image';

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
  },
  rotatingImages: {
    margin: 'auto',
  },
});

export default function Home({ menuItems }) {
  const classes = useStyles();

  return (
    <Grid container spacing={0} direction="row" className={classes.menuGrid}>
      <Navigation menuItems={menuItems} />
      <div className={classes.rotatingImages}>
        <Carousel>
          <Paper>
            <Image src="/Logo.png"></Image>
          </Paper>
          <Paper>
            <p>Why</p>
          </Paper>
        </Carousel>
      </div>
    </Grid>
  );
}

export async function getStaticProps() {
  const menuItems = await getMenu();
  return {
    props: {
      menuItems,
    },
  };
}
