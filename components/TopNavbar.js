import React from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topAppBar: {
    backgroundColor: 'transparent',
    width: '100%',
    // zIndex: 999,
    boxShadow: 'none',
    position: 'absolute',
  },
  topNavBarContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    height: '100%',
    marginTop: 'auto',
    marginBotton: 'auto',
    minHeight: '75px',
  },
  topNavBarItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent',
    minHeight: '75px',
    marginTop: 'auto',
    marginBottom: 'auto',
    zIndex: 999,
  },
  topNavBarIcon: {
    margin: 'auto 1rem auto 2rem',
    color: 'black',
    width: '24px',
    height: '24px',
    padding: 0,
  },
  iconButton: {
    padding: '0px 3rem 0 1rem',
    width: '30px',
    height: '30px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  iconLink: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
}));

function TopNavBar(props) {
  const classes = useStyles();

  return (
    <AppBar className={classes.topAppBar} elevation={0}>
      <CssBaseline />
      <Toolbar disableGutters={true} className={classes.topAppBar}>
        <div className={classes.topNavBarContainer}>
          <div className={classes.topNavBarItem}>
            {/* TODO: Link Social Media buttons */}
              <IconButton className={clsx(classes.iconButton, classes.iconLink)}>
              <a target="_blank" href="http://www.facebook.com/the.salty.zebra.co/">
                <FacebookIcon className={classes.topNavBarIcon} />
              </a>
              </IconButton>
            <Link href="">
              <IconButton className={clsx(classes.iconButton, classes.iconLink)}>
                <InstagramIcon className={classes.topNavBarIcon} />
              </IconButton>
            </Link>
            <Link href="/cart">
              <IconButton className={classes.iconButton}>
                <ShoppingCartIcon className={classes.topNavBarIcon} />
              </IconButton>
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;
