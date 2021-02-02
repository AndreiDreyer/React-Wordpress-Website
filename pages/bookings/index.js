import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Gallery.module.css';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';

import { render } from 'react-dom';
import { momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import BookingForm from '../../components/BookingForm';
moment.locale('en-GB');

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
]; //empty object for now

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
      <Navigation menuItems={menuItems}></Navigation>
      <BookingForm className={classes.root}></BookingForm>
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
