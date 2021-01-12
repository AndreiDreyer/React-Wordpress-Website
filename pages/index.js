import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import Navigation from '../components/Navigation';
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
    display: 'flex',
  },
});

export default function Home({ menuItems }) {
  const classes = useStyles();

  return (
    <Grid
      container
      sapcing={0}
      alignItems="center"
      justify="center"
      direction="row"
      className={classes.menuGrid}
    >
      {/* Rotating Images */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid justify="space-between" container spacing={24}>
            <Grid item></Grid>
            <Grid item>
              <Grid item>
                <Button variant="outlined" className={classes.phoneButton}>
                  Phone
                </Button>
                <Button variant="outlined">Email</Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Logo */}
        </Toolbar>
      </AppBar>
      <Grid justify="center">
        <p>this is the menu</p>
      </Grid>
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
