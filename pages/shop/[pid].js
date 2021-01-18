import { useRouter } from 'next/router';

import Head from 'next/head';
import Link from 'next/link';

import { getProducts, getProduct } from '../../lib/api';

export default function Product({ productData }) {
  const router = useRouter();

  console.log(productData);

  if (!router.isFallback && !productData?.slug) {
    return <p>Hmmmm.... looks like an error</p>;
  }

  return (
    <div>
      <Head>
        <title>{productData.name}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        {router.isFallback ? (
          <h2>Loading ...</h2>
        ) : (
          <div>{productData.name}</div>
        )}
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allProducts = await getProducts();

  return {
    paths: allProducts.map((product) => `/shop/${product.id}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const data = await getProduct(params.pid);

  return {
    props: {
      productData: data,
    },
  };
}
