import React from 'react';

import Head from 'next/head';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grow from '@material-ui/core/Grow';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Youtube from 'react-youtube';

import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
} from "../../components/ImageCard";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("769")]: {
      marginLeft: '0% !important',
      width: '100%',
    },
    [theme.breakpoints.down("1025")]: {
      width: '100%',
    },
    [theme.breakpoints.up("1100")]: {
      marginLeft: '10.5%',
      width: '89.5%',
    },
    display: 'flex',
    flexGrow: 1,
    marginTop: 100,
    
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    alignContent: 'center',
    alignItems: 'center',
    verticalAlign: "middle",
  },
  rotatingImages: {
    margin: 'auto',
  },
  topBanner: {
    height: '100%',
  },
  bannerDiv: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      height: 215,
      marginBottom: 86, 
    },
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
  heading: {
    textAlign: 'center',
    fontFamily: 'Whitefeather',
    color: '#f7f2df',
    [theme.breakpoints.down("376")]: {
      marginTop: '0px !important',
      fontSize: '30px !important'
    },
    [theme.breakpoints.down("420")]: {
      marginTop: '0px !important',
      fontSize: '50px !important',
    },
    [theme.breakpoints.up("540")]: {
      marginTop: 50,
      fontSize: 60,
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: 50,
      fontSize: 100,
    },
  },
  subHeading: {
    textAlign: 'center',
    fontFamily: 'Whitefeather',
    color: '#f7f2df',
    [theme.breakpoints.down("376")]: {
      fontSize: '30px !important'
    },
    [theme.breakpoints.down("420")]: {
      fontSize: 30,
    },
    [theme.breakpoints.up("760")]: {
      fontSize: 60,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 70,
    },
  },
  card: {
    height: 300,
    marginBottom: 1,
  },
  media: {
    height: '100%',
  },
  gridList: {
    display: 'flex',
    width: '100%',
    marginTop: 75,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    [theme.breakpoints.down("769")]: {
      marginLeft: '-5px !important',
    },
    [theme.breakpoints.up("1023")]: {
      marginLeft: '200px !important',
      marginRight: '0.5px !important',
    },
    [theme.breakpoints.up("1100")]: {
      marginLeft: '-1px !important',
    },
  },
  tile: {
    width: '100%',
    height: '500px !important',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));



const tileData = [
  { mediaItemUrl: "vthmLNBfpaU", title: "1", author: "john smith", rows: 1, cols: 1},
  { mediaItemUrl: "vthmLNBfpaU", title: "1", author: "john smith", rows: 1, cols: 1},
  { mediaItemUrl: "vthmLNBfpaU", title: "1", author: "john smith", rows: 1, cols: 1},
  { mediaItemUrl: "vthmLNBfpaU", title: "1", author: "john smith", rows: 1, cols: 1},
  { mediaItemUrl: "vthmLNBfpaU", title: "1", author: "john smith", rows: 1, cols: 1},
  { mediaItemUrl: "vthmLNBfpaU", title: "1", author: "john smith", rows: 1, cols: 1},
  ];

function vidGallery({menuItems}) {
    const classes = useStyles();
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const xlg = useMediaQuery(theme.breakpoints.down('xl'));
  
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const ipad = useMediaQuery(theme.breakpoints.down(769));
    const ipadUp = useMediaQuery(theme.breakpoints.up(768));
  
    const numCols = () => {
      if (ipad && ipadUp) {
        return 1;
      } else if (sm) {
        return 1;
      } else if (md) {
        return 1;
      } else if (xlg) {
        return 2;
      }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Wedding Gallery</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNavBar></TopNavBar>
            <Navigation menuItems={menuItems} ></Navigation>

            <div className={classes.bannerDiv}>
                <Box style={{ margin: 0}}>
                    <FiCard className={classes.card}>
                        <FiCardActionArea className={classes.card}>
                            <FiCardMedia
                                media="picture"
                                alt="Contemplative Reptile"
                                image='./9.jpg'
                                title="Contemplative Reptile"
                                className={classes.media}
                            />
                            <FiCardContent className={classes.fiCardContent}>
                                <Typography className={classes.heading} variant="h5" component="h2">
                                “Photography is the story I fail to put into words.” 
                                </Typography>
                                <Typography className={classes.subHeading} variant="h5" component="h2">
                                - DESTIN SPARKS 
                                </Typography>
                            </FiCardContent>
                        </FiCardActionArea>
                    </FiCard>
                </Box>
            </div>
            <div className={classes.root}>
            <Grow in={true} timeout={'auto'}>
                <GridList cellHeight={600} spacing={10} cols={numCols()} className={classes.gridList}>
                    {tileData.map((tile) => (
                        <GridListTile key={tile.title} className={classes.tile}>
                            <Youtube videoId={tile.mediaItemUrl} className={classes.tile}/>
                        </GridListTile>
                    ))}
                </GridList>
            </Grow>
            </div>
        </React.Fragment>
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
  
  
  export default vidGallery