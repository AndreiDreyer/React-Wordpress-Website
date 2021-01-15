import Head from 'next/head';
import ImageList from '../../components/ImageList'
import Link from 'next/link';
import styles from '../../styles/Gallery.module.css';

import { getMenu } from '../../lib/api';

import Navigation from '../../components/Navigation';

function Gallery({menuItems}) {
    return <div>
        <Head>
        <title>The Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation menuItems={menuItems} ></Navigation>
      {/* <div className={styles.banner}>
            <h1>The Gallery</h1>
    </div> */}
    <div>
    <ImageList>
    <div>
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
    </ImageList>
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
  
  
  export default Gallery