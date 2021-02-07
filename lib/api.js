import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const API_URL = process.env.WP_API_URL;

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const WOOCOMMERCE_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const WOOCOMMERCE_VERSION = process.env.WOOCOMMERCE_VERSION;
const WOOCOMMERCE_AUTH_KEY = process.env.WOOCOMMERCE_AUTH_TOKEN;

const wooCommerceApi = new WooCommerceRestApi({
  url: WOOCOMMERCE_URL,
  consumerKey: WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: WOOCOMMERCE_CONSUMER_SECRET,
  version: WOOCOMMERCE_VERSION,
});

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.log(json.errors);
    console.log('Error Details', query, variables);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getBackgroundImages() {
  const data = await fetchAPI(
    `
    query BackgroundImages {
      pages(where: {title: "Background"}) {
        nodes {
          content
        }
      }
    }
    `,
  );

  return data?.pages?.nodes[0].content;
}

export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    query MyQuery {
      posts(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            date
            title
            slug
            extraPostInfo {
                authorExcerpt
                thumbImage {
                  mediaItemUrl
                }
            }
          }
        }
      }
    }
    `,
  );

  return data?.posts;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `,
  );

  return data?.posts;
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    },
  );

  return data;
}

export async function getMenu() {
  const data = await fetchAPI(
    `
    query GetPrimaryMenu {
      menuItems(where: {location: PRIMARY}) {
        nodes {
          path
          label
        }
      }
    }
    `,
  );
  console.log('data');
  return data;
}

export async function getProducts() {
  try {
    const json = await wooCommerceApi.get('products');
    return json.data;
  } catch (err) {
    console.log('Error');
  }
}

export async function getProduct(productID) {
  try {
    const headers = {
      Authorization: WOOCOMMERCE_AUTH_KEY,
      'Content-Type': 'application/json',
    };

    const PRODUCT_URL = `${WOOCOMMERCE_URL}/wp-json/${WOOCOMMERCE_VERSION}/products/${productID}`;
    const VARIATIONS_URL = `${PRODUCT_URL}/variations`;

    const [product, productVariations] = await Promise.all([
      fetch(PRODUCT_URL, {
        method: 'GET',
        headers,
      }),
      fetch(VARIATIONS_URL, {
        method: 'GET',
        headers,
      }),
    ])
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .catch((error) => {
        console.log('Promise Error: Woopsie Doopsie Oopsie ', error);
      });

    return { product: product, variations: productVariations };
  } catch (err) {
    console.log('Some other Error: ', err);
  }
}
