import React from 'react';
import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';

import Head from 'next/head';

import { Grid } from '@material-ui/core';
import { getMenu } from '../../lib/api';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

// --- Fill Image Card Component Imports --- //
import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
} from "../../components/ImageCard";

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   background: 'transparent',
  //   boxShadow: 'none',
  // },
  phoneButton: {
    marginRight: 10,
  },
  menuGrid: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up("lg")]: {
      height: '100vh',
    },
    [theme.breakpoints.up("xl")]: {
      height: '100vh',
    },
  },
  rotatingImages: {
    margin: 'auto',
  },
  topBanner: {
    height: '100%',
  },
  bannerDiv: {
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints.up("1024")]: {
      height: 215,
      marginBottom: 86, 
      marginLeft: 200,
    },
    [theme.breakpoints.up("lg")]: {
      height: 215,
      marginBottom: 86, 
    },
    [theme.breakpoints.up("xl")]: {
      height: 215,
      marginBottom: 86, 
    },
  },
  card: {
    height: 300,
    marginBottom: 1,
  },
  media: {
    height: 140
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Whitefeather',
    [theme.breakpoints.down("376")]: {
      fontSize: '50px !important'
    },
    [theme.breakpoints.down("420")]: {
      fontSize: 60,
    },
    [theme.breakpoints.up("760")]: {
      fontSize: 100,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 200,
    },
  },
  paperDiv: {
    marginTop: 1,
    position: 'relative',
    marginBottom: 1,
    [theme.breakpoints.up("md")]: {
      height: '20%',
    },
    [theme.breakpoints.up("1024")]: {
      height: '15%',
      marginLeft: 200,
    },
  },
  paper: {
    backgroundColor: '#252525',
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    
    [theme.breakpoints.up("1024")]: {
      height: '100%',
      '& > *': {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
      },
    },
    [theme.breakpoints.down("md")]: {
      height: '100%',
    },
  },
  paperDiv2: {
    marginTop: 1,
    position: 'relative',
    height: '60%',
    [theme.breakpoints.up("1024")]: {
      marginLeft: 200,
    },
  },
  paper2: {
    backgroundColor: '#252525',
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
    '& > *': {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  writingHeading: {
    width: '100%',
    textAlign: 'center',
    color: '#f7f2df',
    fontSize: 100,
    fontFamily: 'Whitefeather',
  },
  writing: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: '#f7f2df',
    fontFamily: 'Oswald Regular',
  },
  grid: {
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints.up("lg")]: {
      marginLeft: 200,
    },
  },
  gridList: {
    flexWrap: 'nowrap'
  },
  tile: {
    height: '100%',
  },
}));


export default function About({ menuItems }) {
  const classes = useStyles();
  const theme = useTheme();

  const tileData = [
    {
      img: './warthog1.jpg',
      title: 'title'
    },
    {
      img: './Gin1.jpg',
      title: 'title'
    },
    {
      img: './RR1.jpg',
      title: 'title'
    }
    ];

  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const xlg = useMediaQuery(theme.breakpoints.down('xl'));

  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const ipad = useMediaQuery(theme.breakpoints.down(769));
  const ipadUp = useMediaQuery(theme.breakpoints.up(768));

  const numCols = () => {
    if (ipad && ipadUp) {
      return 2;
    } else if (sm) {
      return 1;
    } else if (md) {
      return 2;
    } else if (xlg) {
      return 3;
    }
  };

  return (
    <Grid container spacing={0} direction="row" className={classes.menuGrid}>
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavBar></TopNavBar>
      <Navigation menuItems={menuItems} />
      <div className={classes.bannerDiv}>
        <Box style={{ margin: 0}}>
          <FiCard className={classes.card}>
            <FiCardActionArea className={classes.card}>
              <FiCardMedia
                media="picture"
                alt="Contemplative Reptile"
                image='./_MG_9966.jpg'
                title="Contemplative Reptile"
              />
              <FiCardContent className={classes.fiCardContent}>
                <Typography className={classes.heading} variant="h5" component="h2">
                  Making Memories Matter
                </Typography>
              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
        </Box>
      </div>
      
      <div className={classes.paperDiv}>
        <Paper className={classes.paper} variant='outlined'>
          <Typography className={classes.writing} variant="h5" component="h2">
          One cannot deny, Zimbabwe is a country of contrasts. Those that have ventured here will be extremely familiar with the peculiar set of rules attached to this lands governance. And thus, in keeping with this particularly absurd tradition, the Salty Zebra was conceived of a contrast. You see, the founder of this collective is both firmly rooted in her Zimbabwean heritage, while also having a fair amount of sea foam in her veins and with both a degree in Visual Communication and a MSDT Dive Instructor Rating, it seemed the only logical thing when placing a name on this collective, would be to contradict all logic and create a fair amount of contradiction. Meet the Salty Zebra Creative Company, equally salty and perfectly dusty, we are a team with a passion for making memories matter. For searching through the multitudes of moments for that one golden opportunity to capture something seeped in emotion and packed with meaning. 
          </Typography>
        </Paper>
      </div>
      
      <div className={classes.grid}>
        <GridList className={classes.gridList} cols={numCols()} rows={2}>
          {tileData.map((tile) => (
            <GridListTile className={classes.tile} rows={2} key={tile.img}>
              <img src={tile.img} alt={tile.title} />            
            </GridListTile>
          ))}
        </GridList>
      </div>

      <div className={classes.paperDiv2}>
        <Paper className={classes.paper2} variant='outlined'>
          <Typography className={classes.writingHeading} variant="h5" component="h2">
            What we do.  
          </Typography>
          <Typography className={classes.writing} variant="h5" component="h2">
          Making memories matter, is what we’re into. We tend to have a bit of a rebellious streak, and rather enjoy bending and pausing time, even just for a moment, and if only for a split second long enough for the shutter to close. Growing up in a country well rehearsed in things not quite going according to the plan, we are adept in capturing memories as they happen and are not phased with having to go the extra mile to get the perfect shot. With Jessie trained in stills but unable to help herself with recording a moving memory every now and then, and Chad working every angle from both the ground and the air, they are the perfect pair to make your memories matter ! 
          </Typography>
          <Typography className={classes.writingHeading} variant="h5" component="h2">
            Who we are.  
          </Typography>
          <Typography className={classes.writing} variant="h5" component="h2">
          While we were growing up our dad had a butterfly collection. It used to sit proudly in the corner of the lounge, a deep mahogany with what seemed like hundreds of drawers. There were realistically about twenty of them, and each stored a childhood of memories. For within those pinioned wings and perfectly preserved forms lay a reminder of an adventure, a memory of the times we spent paddling through the Zambezi river, our motor had a tendency of being rather temperamental, or sweating our way through the harsh lowveld of West Nicholson or braving our way through the waters of Mozambique. We never realized it at the time, but our father was instilling in us the art of observation. Of looking through the normality of the world, and finding those intricately patterned, vividly colored fleetingly pervasive, moments. Moments that when you turn a lens on them, we’ve found, tend to become magic. 
          Using their homeland, Zimbabwe, as their muse, and the almost instinctual ability to ‘make a plan’ that tends to be instilled in most Zimbabweans, brother-sister team Jessie and Chad have taken those skills instilled by their dad, honed them in two of the top creative institutions in Southern Africa, and are now adding their own flare to what they are dubbing ‘Brett’s Butterfly Effect’ 
          </Typography>
        </Paper>
      </div>
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
