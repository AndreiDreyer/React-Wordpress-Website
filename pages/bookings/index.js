import Head from 'next/head';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import BookingForm from '../../components/BookingForm';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Container from '@material-ui/core/Container';
import {Helmet} from 'react-helmet';

import { customTheme } from '../../src/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    top: 100,
    left: 300,
    right: 100,
    bottom: 100,
    position: 'absolute',
    margin: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: "middle",
    backgroundColor: "#252525",  

    [theme.breakpoints.down("xs")]: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      position: 'absolute',
      margin: 'auto',
      alignItems: 'center',
      alignContent: 'center',
      verticalAlign: "middle",
      backgroundColor: "#252525",
      maxHeight: '90%',
    },
  },
}));

function Booking({ menuItems }) {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
                <style>{'body { background-color: #f7f2df; }'}</style>
            </Helmet>
      <Head>
        <title>Book a Shoot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation menuItems={menuItems}></Navigation>
      <Container maxWidth="lg">
      <Card className={classes.root}>
        <CardContent>
          <BookingForm></BookingForm>
        </CardContent>
      </Card>
      </Container>
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
