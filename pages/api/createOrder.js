const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const WOOCOMMERCE_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const WOOCOMMERCE_VERSION = process.env.WOOCOMMERCE_VERSION;
const WOOCOMMERCE_AUTH_KEY = process.env.WOOCOMMERCE_AUTH_TOKEN;

export default async (req, res) => {
  const headers = {
    Authorization: WOOCOMMERCE_AUTH_KEY,
    'Content-Type': 'application/json',
  };

  const FINAL_URL = WOOCOMMERCE_URL + '/wp-json/' + WOOCOMMERCE_VERSION + '/orders';
  try {
    console.log(WOOCOMMERCE_AUTH_KEY);
    console.log(FINAL_URL);

    const response = await fetch(FINAL_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    });

    console.log(response);

    if (response.status === 200 || response.status === 201) {
      res.statusCode = response.status === 200 ? 200 : 201;
      res.end();
    } else {
      res.statusCode = 400;
      res.end();
    }
  } catch (err) {
    console.log('Error ocurred: ', err);
  }
  // const json = await res.json();

  // if (json.errors) {
  //   console.log('Error Details');
  //   console.log(json.errors);
  //   throw new Error('Failed to fetch API');
  // }
  // return json.data;
};
