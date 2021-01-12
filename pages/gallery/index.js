import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Gallery.module.css';

import Navigation from '../../components/Navigation';

function Gallery() {
    return <div>
        <Head>
        <title>The Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation></Navigation>
      <div className={styles.banner}>
            <h1>The Gallery</h1>
    </div>
    <main>
    <div className={styles.card}>
        <img src="/Logo.png" className={styles.cardImage}/>;
        <div className={styles.cardBody}>
            <p className={styles.cardText}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    </main>
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