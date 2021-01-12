import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import Navigation from '../components/Navigation';
import { Grid } from '@material-ui/core';
import { getMenu } from '../lib/api';

export default function Home({ menuItems }) {
  return (
    <Grid container direction="row">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation menuItems={menuItems}></Navigation>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to our demo blog</h1>
        <p>
          You can find more articles on the{' '}
          <Link href="/blog">
            <a>blog articles page</a>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
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
