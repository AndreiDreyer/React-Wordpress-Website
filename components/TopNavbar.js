import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topAppBar: {
    backgroundColor: 'transparent',
    width: '100%',
    zIndex: 999,
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
  },
  topNavBarIcon: {
    margin: 'auto 1rem auto 2rem',
    color: 'black',
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
            <FacebookIcon className={classes.topNavBarIcon} />
            <InstagramIcon className={classes.topNavBarIcon} />
            <ShoppingCartIcon className={classes.topNavBarIcon} />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;
