import Head from 'next/head';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import BookingForm from '../../components/BookingForm';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    alignContent: 'center',
    height: 900,
    maxWidth: 1300,
    verticalAlign: "middle",
    marginLeft: 480,
  },
}));

function Booking({ menuItems }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Book a Shoot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation menuItems={menuItems}></Navigation>
      <Card className={classes.root}>
        <CardContent>
          <BookingForm></BookingForm>
        </CardContent>
      </Card>
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
