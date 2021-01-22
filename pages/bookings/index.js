import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Gallery.module.css';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';
import Calendar from '../../components/Calendar'

import { render } from "react-dom";
import {momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { makeStyles } from '@material-ui/core/styles';
moment.locale("en-GB");


const localizer = momentLocalizer(moment);


const myEventsList = [
    {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)},
    ] //empty object for now

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          height: 980,
        //   overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
      }));

function Booking({menuItems}) {
    const classes = useStyles();

    // con = constructor(){
    //     //We will populate this function later
    // }

    // componentDidMount(){
    // //We will populate this function later
    // }

    return <div>
        <Head>
        <title>The Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation menuItems={menuItems} ></Navigation>
    <div className = {classes.root} >
        {/* <Calendar 
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
        /> */}
        <Calendar></Calendar>
    </div>
    </div>
  }

  export async function getStaticProps() {
    const menuItems = await getMenu();
    return {
      props: {
        menuItems,
      },
    };
  }
  
  
  export default Booking