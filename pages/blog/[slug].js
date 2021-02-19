import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPostsWithSlug, getPost, getAllPosts } from '../../lib/api';

import styles from '../../styles/Home.module.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import blogStyles from '../../styles/Blog.module.css';

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
    height: 300,
    marginBottom: 1,
  },
  media: {
    height: '100%',
  },
}));

export default function Post({ postData, allPosts }) {
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

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavBar></TopNavBar>
      {allPosts.edges.map(({ node }) => (
      <main className={styles.main}>
      <div className={classes.bannerDiv}>
        <Box style={{ margin: 0}}>
          <FiCard className={classes.card}>
            <FiCardActionArea className={classes.card}>
              <FiCardMedia
                media="picture"
                alt="Contemplative Reptile"
                image={node.extraPostInfo.thumbImage.mediaItemUrl}
                title="Contemplative Reptile"
                className={classes.media}
              />
              <FiCardContent className={classes.fiCardContent}>
                <Typography className={classes.heading} variant="h5" component="h2">
                Ramblings While We Roam
                </Typography>
              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
        </Box>
      </div>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <article className={blogStyles.article}>
            <div className={blogStyles.postmeta}>
              <h1 className={styles.title}>{postData.title}</h1>
              <p>{formatDate(postData.date)}</p>
            </div>
            <div
              className="post-content content"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </article>
        )}
        <p>
          <Link href="/blog">
            <a>Back to articles</a>
          </Link>
        </p>
      </main>
      ))}
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
  const allPosts = await getAllPosts();

  return {
    props: {
      postData: data.post,
      allPosts,
    },
  };
}
