import React, { useContext, useState } from 'react';

import Head from 'next/head';

import Navigation from '../../components/Navigation';
import TopNavBar from '../../components/TopNavbar';
import Footer from '../../components/Footer';

import { CartContext } from '../../src/contexts/CartContext';
import { getMenu, getProduct } from '../../lib/api';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';
import { isInteger } from 'formik';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down(765)]: {
      position: 'relative',
      minHeight: '100%',
    },
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& .MuiTextField-root': {
      [theme.breakpoints.down(768)]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '50%',
      },
    },
  },
  productContainer: {
    marginLeft: '1rem',
    marginRight: '1rem',

    [theme.breakpoints.down(765)]: {
      marginTop: '75px',
      marginBottom: '75px',
    },
  },
  imageContainer: {
    display: 'flex',
    flexGrow: '1',
    flexWrap: 'wrap',
    '& img': {
      width: '60%',
      [theme.breakpoints.down(768)]: {
        width: '100%',
      },
    },
    '& h1': {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
  },
  productShortDescription: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  cartProductInfo: {
    display: 'flex',
  },
  priceText: {
    width: '100%',
    [theme.breakpoints.down('768')]: {
      marginTop: 'auto',
      marginBottom: 'auto',
      textAlign: 'right',
      marginLeft: 'auto',
      marginRight: 0,
      width: '30%',
    },
  },
  variationChoice: {
    width: '50%',
    [theme.breakpoints.down(768)]: {
      width: '80%',
    },
  },
  cartButton: {
    backgroundColor: '#252525',
    color: 'white',
    marginTop: '1rem',
    [theme.breakpoints.down(768)]: {
      display: 'block',
      width: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  productHeaderContainer: {
    '& h1': {
      width: '100%',
      marginRight: '0',
      marginBlockStart: 0,
      marginBlockEnd: 0,
      marginInlineStart: 0,
      marginInlineEnd: 0,
      display: 'inline-block',
    },
    '& hr': {
      backgroundColor: 'black',
      height: 3,
    },
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      '& h1': {
        width: '70%',
      },
    },
  },
  quantityField: {
    width: '50%',
    marginLeft: '0.5rem',
    [theme.breakpoints.down(768)]: {
      marginLeft: '0.5rem',
    },
  },
  infoContainer: {
    width: '100%',
    [theme.breakpoints.up(768)]: {
      width: '30%',
      marginLeft: '1rem',
    },
  },
  productDescription: {
    [theme.breakpoints.down(1025)]: {
      display: 'none',
    },
  },
  productDescriptionSmall: {
    [theme.breakpoints.up(1025)]: {
      display: 'none',
    },
  },
  productShortDescription: {
    [theme.breakpoints.up(1025)]: {
      display: 'none',
    },
    [theme.breakpoints.down(765)]: {
      display: 'none',
    },
  },
}));

export default function Product({ productData, variationData, menuItems }) {
  const { addProduct, cartItems } = useContext(CartContext);
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(variationData[0].attributes[0].option);

  let startPrice = variationData.find((item) => item.attributes[0].option === size).price;
  const [price, setPrice] = useState(startPrice);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const addToCart = (productData) => {
    const selectedVariation = variationData.find((item) => item.attributes[0].option === size) || {};

    selectedVariation.quantity = quantity;
    selectedVariation.product_id = productData.id;
    selectedVariation.name = productData.name;

    addProduct(selectedVariation);
  };

  const handleChange = (e) => {
    const { target } = e;

    const newPrice = variationData.find((item) => item.attributes[0].option === target.value).price;

    setSize(e.target.value);

    const newestPrice = newPrice * quantity;

    setPrice(newestPrice);
  };

  const handleQuantity = (e) => {
    if (e.target.value === '') {
      setQuantity('');
    } else if (isInteger(e.target.value)) {
      setQuantity(parseInt(e.target.value));

      const unitPrice = variationData.find((item) => item.attributes[0].option === size).price || {};
      const newPrice = parseInt(unitPrice) * parseInt(e.target.value);

      setPrice(newPrice);
    }
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>{productData.name}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Navigation menuItems={menuItems} />
      <TopNavBar />

      <Grid container spacing={0} className={classes.productContainer}>
        <Grid item xs={12} className={classes.imageContainer}>
          <img src={productData.images[0].src} />
          <div className={classes.infoContainer}>
            <div className={classes.productHeaderContainer}>
              <h1>{productData.name}</h1>
              <Divider />
              <h2 className={classes.priceText}>${price}.00</h2>
            </div>
            <div className={classes.cartProductInfo}>
              <TextField id="select-variation" select label="Size" value={size} onChange={handleChange} helperText="Select Size" className={classes.variationChoice}>
                {variationData?.map((variation) => (
                  <MenuItem key={variation.id} value={variation.attributes[0].option}>
                    {variation.attributes[0].option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={classes.quantityField}
                id="quantity-field"
                label="Quantity"
                type="number"
                value={quantity}
                InputLabelProps={{ shrink: true }}
                onChange={handleQuantity}
              />
            </div>
            <Button className={classes.cartButton} onClick={() => addToCart(productData)}>
              Add to Cart
            </Button>
            <div dangerouslySetInnerHTML={{ __html: productData.short_description }} className={classes.productShortDescription} />
            <div className={classes.productDescription}>
              <h1>Description:</h1>
              <div dangerouslySetInnerHTML={{ __html: productData.description }} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.cartButtonContainer}></Grid>
        <Grid item xs={12} className={classes.productInfo}>
          <div className={classes.productDescriptionSmall}>
            <h1>Description:</h1>
            <div dangerouslySetInnerHTML={{ __html: productData.description }} />
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await getProduct(context.params.pid);
  const menuItems = await getMenu();

  return {
    props: {
      productData: data.product,
      variationData: data.variations,
      menuItems,
    },
  };
}
