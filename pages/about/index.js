import React from 'react';
import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';
import Footer from '../../components/Footer';

import Head from 'next/head';

import { Grid } from '@material-ui/core';
import { getMenu } from '../../lib/api';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

// --- Fill Image Card Component Imports --- //
import { FiCard, FiCardActionArea, FiCardActions, FiCardContent, FiCardMedia } from '../../components/ImageCard';

const useStyles = makeStyles((theme) => ({
  phoneButton: {
    marginRight: 10,
  },
  mainContainer: {
    [theme.breakpoints.down(765)]: {
      position: 'relative',
    },
  },
  contentWrap: {
    paddingBottom: '75px',
  },
  menuGrid: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      height: '100vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: '100vh',
    },
    [theme.breakpoints.down(765)]: {
      paddingBottom: '75px',
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
    [theme.breakpoints.up('1024')]: {
      height: 215,
      marginBottom: 86,
      marginLeft: 200,
    },
    [theme.breakpoints.up('lg')]: {
      height: 215,
      marginBottom: 86,
    },
    [theme.breakpoints.up('xl')]: {
      height: 215,
      marginBottom: 86,
    },
  },
  card: {
    height: 300,
    marginBottom: 1,
  },
  media: {
    height: 140,
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Whitefeather',
    [theme.breakpoints.down('376')]: {
      fontSize: '50px !important',
    },
    [theme.breakpoints.down('420')]: {
      fontSize: 60,
    },
    [theme.breakpoints.up('760')]: {
      fontSize: 100,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 200,
    },
  },
  paperDiv: {
    marginTop: 1,
    position: 'relative',
    marginBottom: 1,
    [theme.breakpoints.up('md')]: {
      height: '20%',
    },
    [theme.breakpoints.up('1024')]: {
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

    [theme.breakpoints.up('1024')]: {
      height: '100%',
      '& > *': {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
    },
  },
  paperDiv2: {
    marginTop: 1,
    position: 'relative',
    height: '200%',
    [theme.breakpoints.up('1024')]: {
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
    padding: 20,
    '& > *': {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  writingHeading: {
    width: '100%',
    textAlign: 'center',
    textDecoration: 'underline',
    color: '#252525',
    fontSize: 100,
    fontFamily: 'Whitefeather',
  },
  writingSubHeading: {
    width: '100%',
    textAlign: 'center',
    color: '#252525',
    fontSize: 30,
    fontFamily: 'Oswald Regular',
  },
  writing: {
    marginTop: 10,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: '#252525',
    fontFamily: 'Oswald Regular',
  },
  grid: {
    flexGrow: 1,
    marginTop: 20,
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      marginLeft: 200,
    },
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  tile: {
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
}));

export default function About({ menuItems }) {
  const classes = useStyles();
  const theme = useTheme();

  const tileData = [
    {
      img: './warthog1.jpg',
      title: 'title',
    },
    {
      img: './Gin1.jpg',
      title: 'title',
    },
    {
      img: './RR1.jpg',
      title: 'title',
    },
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
    <div className={classes.mainContainer}>
      <Grid container spacing={0} direction="row" className={classes.menuGrid}>
        <Head>
          <title>About Us</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TopNavBar></TopNavBar>
        <Navigation menuItems={menuItems} />
        <div className={classes.bannerDiv}>
          <Box style={{ margin: 0 }}>
            <FiCard className={classes.card}>
              <FiCardActionArea className={classes.card}>
                <FiCardMedia media="picture" alt="Contemplative Reptile" image="./_MG_9966.jpg" title="Contemplative Reptile" />
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
            <Typography className={classes.writing} variant="h5" component="h2" gutterBottom={true}>
              One cannot deny, Zimbabwe is a country of contrasts. Those that have ventured here will be extremely familiar with the peculiar set of rules attached to this lands
              governance. And thus, in keeping with this particularly absurd tradition, the Salty Zebra was conceived of a contrast. You see, the founder of this collective is both
              firmly rooted in her Zimbabwean heritage, while also having a fair amount of sea foam in her veins and with both a degree in Visual Communication and a MSDT Dive
              Instructor Rating, it seemed the only logical thing when placing a name on this collective, would be to contradict all logic and create a fair amount of
              contradiction. Meet the Salty Zebra Creative Company, equally salty and perfectly dusty, we are a team with a passion for making memories matter. For searching
              through the multitudes of moments for that one golden opportunity to capture something seeped in emotion and packed with meaning.
            </Typography>
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
            <Typography className={classes.writingHeading} variant="h5" component="h2">
              What we do.
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
              Making memories matter, is what we’re into. We tend to have a bit of a rebellious streak, and rather enjoy bending and pausing time, even just for a moment, and if
              only for a split second long enough for the shutter to close. Growing up in a country well rehearsed in things not quite going according to the plan, we are adept in
              capturing memories as they happen and are not phased with having to go the extra mile to get the perfect shot. With Jessie trained in stills but unable to help
              herself with recording a moving memory every now and then, and Chad working every angle from both the ground and the air, they are the perfect pair to make your
              memories matter !
            </Typography>
            <Typography className={classes.writingHeading} variant="h5" component="h2">
              Who we are.
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
              While we were growing up our dad had a butterfly collection. It used to sit proudly in the corner of the lounge, a deep mahogany with what seemed like hundreds of
              drawers. There were realistically about twenty of them, and each stored a childhood of memories. For within those pinioned wings and perfectly preserved forms lay a
              reminder of an adventure, a memory of the times we spent paddling through the Zambezi river, our motor had a tendency of being rather temperamental, or sweating our
              way through the harsh lowveld of West Nicholson or braving our way through the waters of Mozambique. We never realized it at the time, but our father was instilling
              in us the art of observation. Of looking through the normality of the world, and finding those intricately patterned, vividly colored fleetingly pervasive, moments.
              Moments that when you turn a lens on them, we’ve found, tend to become magic. Using their homeland, Zimbabwe, as their muse, and the almost instinctual ability to
              ‘make a plan’ that tends to be instilled in most Zimbabweans, brother-sister team Jessie and Chad have taken those skills instilled by their dad, honed them in two of
              the top creative institutions in Southern Africa, and are now adding their own flare to what they are dubbing ‘Brett’s Butterfly Effect’
            </Typography>
            <Typography className={classes.writingHeading} variant="h5" component="h2">
            PHOTO
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2" paragraph={true}>
            “Photography is the story I fail to put into words.” 
            - DESTIN SPARKS 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            It all started about eight years ago, when I was handed the keys to my very first car, a mint green Datsun 1200 aptly dubbed, the Bomber. Little did I know that the life lesson my parents had tucked into that responsibility of vehicle ownership would shape and impact the future in the way it has. Fast forward to now and a passion has been expanded and molded into a company. A company blessed with the privilege to capture your images and to make those moments into memories that will bring a smile to your face in years to come. 
            </Typography>
            <Typography className={classes.writingSubHeading} variant="h5" component="h2">
            Photographic services include but are not in any way limited to; 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Products and Promotional
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Travel 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Family Photoshoots 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Weddings, Elopements and Couple shoots 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2" paragraph={true}>
            Content Creation 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            With experience across photographic genres and having the fortune to work in many countries and different shooting environments, the Salty Zebra team are old hands at adjusting to each and every collaboration we find ourselves in. We take pride in being able to get along with most age groups, animals and conditions and place a huge amount of focus in creating and capturing images in a unique and creative way. We cannot wait to collaborate with you and to make some magic ! 
            </Typography>
            <Typography className={classes.writingHeading} variant="h5" component="h2">
            VIDEO
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2" paragraph={true}>
            They say a photo is worth a thousand words, it’s a wonder then, what the value of a video is? 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2" paragraph={true}>
            Throughout our childhood, almost most mornings, yes Sunday’s included, there tended to be a loud knock on the door. It was exactly the same every morning, it would be the time of the day when things haven’t quite awoken yet. The darkness of night still clung heavy, like a thick blanket, over the brightness of the day and the birds were still warming up their vocal chords. We welcomed every morning in this manner, running shoes on, panting our way through the blue light haze of dawn. As children we would lie there, barely awake yet not quite consumed still by dreams, and dread those knuckles against the wooden door, unawares to us, our mom was training us to be videographers. All those early mornings, that constant desire for dedication and that pursuit for going the extra mile have formed the basis of our moving memories and filming work. Running shoes have been replaced by a conglomeration of camera gear and dread by a welcome anticipation to be welcoming the morning with the marvel of witnessing a sunrise through a viewfinder.    
            </Typography>
            <Typography className={classes.writingSubHeading} variant="h5" component="h2" paragraph={true}>
            Videographic services include but are not in any way limited to; 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Promotional videos
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Documentaries
            </Typography> 
            <Typography className={classes.writing} variant="h5" component="h2">
            Travel 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Weddings and Elopements 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            Content Creation 
            </Typography>
            <Typography className={classes.writing} variant="h5" component="h2">
            With a run and gun, documentary style, our videographic team will ensure that regardless of the weather, despite the challenges of the location and in face of whatever an on location shoot can throw at us we are always prepared, laces tied, ready to run the extra mile to ensure your brand is portrayed in the most professional and picturesque way possible, or your wedding is the film on repeat for date night because you just can’t get enough of it. What can we say, manipulating time just happens to be one of our favorite pass times. 

            </Typography>
        </div>
      </Grid>
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
