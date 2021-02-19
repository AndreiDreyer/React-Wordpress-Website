import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPostsWithSlug, getPost, getAllPosts } from '../../lib/api';

import styles from '../../styles/Home.module.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import blogStyles from '../../styles/Blog.module.css';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TopNavBar from '../../components/TopNavbar';

import {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardContent,
  FiCardMedia
} from "../../components/ImageCard";

const useStyles = makeStyles((theme) => ({
  topBanner: {
    height: '100%',
  },
  bannerDiv: {
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints.down("sm")]: {
      height: 215,
      marginBottom: 86, 
    },
    [theme.breakpoints.up("1024")]: {
      height: 215,
      marginBottom: 86, 
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
    textDecoration: 'underline',
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
  card: {
    height: 600,
    marginBottom: 1,
  },
  media: {
    height: '100%',
  },
  main: {
    width: '100%',
  },
  container: {
    marginTop: 0,
  },
  backButton: {
    marginTop: 300,
    color: 'white',
    backgroundColor: '#252525',
  },
  paper: {
    marginTop: -10,
    padding: 20,
    color: '#f7f2df',
    backgroundColor: '#252525',
  },
}));

export default function Post({ postData }) {
  const router = useRouter();
  const classes = useStyles();

  if (!router.isFallback && !postData?.slug) {
    return <p>hmmm....looks like an error</p>;
  }

  const formatDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  };
  console.log(postData)
  return (
    <div className={classes.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavBar></TopNavBar>
      <main className={classes.main}>
      <div className={classes.bannerDiv}>
        <Box style={{ margin: 0}}>
          <FiCard className={classes.card}>
            <FiCardActionArea className={classes.card}>
              <FiCardMedia
                media="picture"
                alt="Blog Post"
                image={postData.featuredImage.node.sourceUrl}
                title={postData.title}
                className={classes.media}
              />
            </FiCardActionArea>
          </FiCard>
        </Box>
      </div>
        <Button variant='outlined' href="/blog" className={classes.backButton} >
            Back
        </Button>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <article className={blogStyles.article}>
            <Paper elevation={3} className={classes.paper}>
            <div className={blogStyles.postmeta}>
              <Typography className={classes.heading} variant="h1" component="h2">
                {postData.title}
              </Typography>
              <p>{formatDate(postData.date)}</p>
            </div>
            
            <div
              className="post-content content"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
            </Paper>
          </article>
        )}
        
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);

  return {
    props: {
      postData: data.post,
      allPosts,
    },
  };
}
