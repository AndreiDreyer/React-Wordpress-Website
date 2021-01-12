import React from 'react';

import Navigation from '../components/Navigation';

import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { Grid } from '@material-ui/core';
import { getMenu } from '../lib/api';

import { makeStyles } from '@material-ui/core/styles';

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
});

export default function Home({ menuItems }) {
  const classes = useStyles();

  return (
    <Grid container sapcing={0} direction="row" className={classes.menuGrid}>
      <Navigation menuItems={menuItems} />
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
