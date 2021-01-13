import Head from 'next/head';
import GridList from '../../components/GridList'
import Link from 'next/link';
import styles from '../../styles/Gallery.module.css';

import Navigation from '../../components/Navigation';
// import { GridList } from '@material-ui/core';

function Gallery() {
    return <div>
        <Head>
        <title>The Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation></Navigation>
      {/* <div className={styles.banner}>
            <h1>The Gallery</h1>
    </div> */}
    <GridList></GridList>
    <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by{' '}
          <img src="../../assets/ADSolutionsLogo.jpg" alt="ADSolutions Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  }
  
  export default Gallery