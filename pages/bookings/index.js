import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Gallery.module.css';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';

import { render } from 'react-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import BookingForm from '../../components/BookingForm';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    //   overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

function Booking({ menuItems }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>The Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={0} orientation="column">
        <Grid item>
          <Navigation menuItems={menuItems}></Navigation>
        </Grid>
        <Grid item>
          <BookingForm className={classes.root}></BookingForm>
        </Grid>
      </Grid>
    </div>
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

export default Booking;
