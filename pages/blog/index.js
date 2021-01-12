import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { getAllPosts, getMenu } from '../../lib/api';
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

import Navigation from '../../components/Navigation';

import Container from '@material-ui/core/Container';

const Blog = ({ allPosts, menuItems }) => (
  <React.Fragment>
    <Head>
      <title>The Salty Zebra</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navigation menuItems={menuItems} />
    <Container maxWidth="lg">
      <h1 className={styles.title}>Latest Blog Articles</h1>
      <section>
        {allPosts.edges.map(({ node }) => (
          <div className={blogStyles.listitem} key={node.id}>
            <div className={blogStyles.listitem__thumbnail}>
              <figure>
                <img
                  src={node.extraPostInfo.thumbImage.mediaItemUrl}
                  alt={node.title}
                />
              </figure>
            </div>
            <div className={blogStyles.listitem__content}>
              <h2>{node.title}</h2>
              <p>{node.extraPostInfo.authorExcerpt}</p>
              <Link href={`/blog/${node.slug}`}>
                <a>Read More</a>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </Container>
  </React.Fragment>
);

export default Blog;

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  const menuItems = await getMenu();
  return {
    props: {
      allPosts,
      menuItems,
    },
  };
}
