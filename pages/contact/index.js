import Head from 'next/head';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';
import Footer from '../../components/Footer';

import { makeStyles } from '@material-ui/core/styles';
import ContactForm from '../../components/ContactForm';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    verticalAlign: 'middle',
    backgroundImage: 'url(./compressedBookingForm.jpg)',
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundSize: 'cover',
    boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
    paddingBottom: 75,

    [theme.breakpoints.down('xs')]: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      minHeight: '90%',
    },
    [theme.breakpoints.down('380')]: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      maxHeight: '100%',
    },
    [theme.breakpoints.down('770')]: {
      top: 60,
      left: 20,
      right: 20,
      bottom: 30,
      maxHeight: '90%',
    },
    [theme.breakpoints.up('1020')]: {
      top: 100,
      left: 220,
      right: 20,
      bottom: 100,
    },
    [theme.breakpoints.up('lg')]: {
      top: 100,
      left: 220,
      right: 20,
      bottom: 100,
    },
    [theme.breakpoints.up('xl')]: {
      top: 100,
      left: 500,
      right: 300,
      bottom: 100,
    },
  },
  second: {
    [theme.breakpoints.down('365')]: {},
    [theme.breakpoints.down('380')]: {
      minHeight: '75%',
      alignContent: 'right',
    },
    [theme.breakpoints.down('770')]: {},
    [theme.breakpoints.up('1020')]: {
      marginLeft: 100,
      marginTop: 200,
      maxWidth: '75%',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: 300,
      marginTop: 10,
      maxWidth: '50%',
    },
    background: 'rgba(31,65,69, 0.2)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3)',
  },
}));

function Contact({ menuItems }) {
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <style>{'body { background-color: #f7f2df; }'}</style>
      </Helmet>
      <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavBar></TopNavBar>
      <Navigation menuItems={menuItems}></Navigation>
      <Container maxWidth="lg">
        <Card className={classes.root}>
          <CardContent>
            <Card className={classes.second}>
              <ContactForm></ContactForm>
            </Card>
          </CardContent>
        </Card>
      </Container>
      <Footer />
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

export default Contact;
