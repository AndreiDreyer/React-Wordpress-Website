import React, { useContext, useState } from 'react';

import { CartContext } from '../../src/contexts/CartContext';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  gridItem: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Checkout() {
  const { total, cartItems, checkout, handleCheckout } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const [{ firstName, surname, email, phoneNumber, address }, setCheckoutInformation] = useState({});

  const classes = useStyles();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleTextFieldChange = (key) => (e) => {
    const { value } = e.target;

    setCheckoutInformation((old) => ({
      ...old,
      [key]: value,
    }));
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
        <TextField required id="name" label="First Name" variant="standard" className={classes.textField} onChange={handleTextFieldChange('firstName')} />
        <TextField required id="surname" label="Surname" variant="standard" className={classes.textField} onChange={handleTextFieldChange('surname')} />
        <TextField required id="email" label="Email Address" variant="standard" className={classes.textField} onChange={handleTextFieldChange('email')} />
        <TextField required id="phoneNumber" label="Phone Number" variant="standard" className={classes.textField} onChange={handleTextFieldChange('phoneNumber')} />
        <TextField required id="addressLine1" label="Address Line 1" variant="standard" className={classes.textField} onChange={handleTextFieldChange('address')} />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup aria-label="payment-method" name="payment-method" value={paymentMethod} onChange={handlePaymentChange}>
            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Button>Checkout</Button>
      </Grid>
    </Grid>
  );
}
