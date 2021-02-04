import React, { useContext, useState } from 'react';

import { CartContext } from '../../src/contexts/CartContext';
import PaypalButton from '../../components/PaypalButtons';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'next/link';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { getMenu } from '../../lib/api';
import { useRouter } from 'next/router';
import PaypalButtons from '../../components/PaypalButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  gridItem: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export default function Checkout() {
  const router = useRouter();
  const { total, cartItems, checkout, handleCheckout } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [{ firstName, surname, address, country, province, email, phoneNumber, city }, setCheckoutInformation] = useState({
    country: 'ZIM',
  });

  const classes = useStyles();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleFormChange = (key) => (e) => {
    const { value } = e.target;

    setCheckoutInformation((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const submitCheckout = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'cash') {
      const customerData = {
        first_name: firstName,
        last_name: surname,
        address_1: address,
        address_2: '',
        city: city,
        state: province,
        postcode: '0000',
        country: country,
        email: email,
        phone: phoneNumber,
      };

      const lineItems = cartItems.map((item) => ({ product_id: item.product_id, variation_id: item.id, quantity: item.quantity }));

      const data = {
        payment_method: 'cod',
        payment_method_title: 'Cash on delivery',
        set_paid: false,
        billing: customerData,
        shipping: customerData,
        line_items: lineItems,
        shipping_lines: [],
      };

      try {
        const res = await fetch('./api/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (res.status === 200 || res.status === 201) {
          router.push('/checkout/success');
        } else {
          router.push('/checkout/failure');
        }
      } catch (err) {
        console.log('Error Frontend: ', err);
      }
    }
  };

  return (
    <Grid container direction="row">
      <Grid item xs={12} className={classes.gridItem}>
        <h1>Checkout Page</h1>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <p>Total: {total}</p>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h4" component="h4">
          Shipping Address
        </Typography>
        <TextField required id="name" label="First Name" variant="standard" className={classes.textField} onChange={handleFormChange('firstName')} />
        <TextField required id="surname" label="Surname" variant="standard" className={classes.textField} onChange={handleFormChange('surname')} />
        <TextField required id="addressLine1" label="Address Line 1" variant="standard" className={classes.textField} onChange={handleFormChange('address')} />
        <TextField required id="city" label="City" variant="standard" className={classes.textField} onChange={handleFormChange('city')} />
        <TextField required id="province" label="Province" variant="standard" className={classes.textField} onChange={handleFormChange('province')} />
        <TextField required select id="country" label="Country" variant="standard" className={classes.textField} value="ZIM" onChange={handleFormChange('country')}>
          <MenuItem value="ZIM">Zimbabwe</MenuItem>
        </TextField>
        <TextField required id="email" label="Email Address" variant="standard" className={classes.textField} onChange={handleFormChange('email')} />
        <TextField required id="phoneNumber" label="Phone Number" variant="standard" className={classes.textField} onChange={handleFormChange('phoneNumber')} />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup aria-label="payment-method" name="payment-method" value={paymentMethod} onChange={handlePaymentChange}>
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        {paymentMethod === 'cash' ? <Button onClick={submitCheckout}>Checkout</Button> : <PaypalButton paymentAmount={total} />}
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps() {
  const menuItems = await getMenu();
  return {
    props: {
      menuItems: menuItems,
    },
  };
}
