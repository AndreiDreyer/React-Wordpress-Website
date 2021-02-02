import React, { useContext, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { CartContext } from '../../src/contexts/CartContext';
import { getProduct } from '../../lib/api';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '1rem',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '10rem',
    },
  },
}));

export default function Product({ productData, variationData }) {
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const classes = useStyles();

  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState('A2');

  let startPrice = variationData.filter((item) => item.attributes[0].option === 'A2')[0].price;
  const [price, setPrice] = useState(startPrice);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const addToCart = (productData) => {
    const selectedVariation = variationData.filter((item) => item.attributes[0].option === size)[0];

    selectedVariation.quantity = quantity;
    selectedVariation.product_id = productData.id;

    addProduct(selectedVariation);
  };

  const handleChange = (e) => {
    const target = e.target;

    const newPrice = variationData.filter((item) => item.attributes[0].option === target.value)[0].price;

    setSize(e.target.value);
    setPrice(newPrice);
  };

  return (
    <div>
      <Head>
        <title>{productData.name}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Grid container spacing={0} orientation="row" className={classes.root}>
        <Grid item>
          <div>{productData.name}</div>
          <div>{price}</div>
          <div>
            <TextField id="select-variation" select label="Size" value={size} onChange={handleChange} helperText="Select Variation">
              {variationData?.map((variation) => (
                <MenuItem key={variation.id} value={variation.attributes[0].option}>
                  {variation.attributes[0].option}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
        <Grid container className={classes.root}>
          {!isInCart(productData) && (
            <Grid item>
              <Button variant="outlined" onClick={() => addToCart(productData)}>
                Add to cart
              </Button>
              <TextField id="quantity-field" label="Quantity" type="number" defaultValue={0} InputLabelProps={{ shrink: true }} onChange={(e) => setQuantity(e.target.value)} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await getProduct(context.params.pid);

  return {
    props: {
      productData: data.product,
      variationData: data.variations,
    },
  };
}
