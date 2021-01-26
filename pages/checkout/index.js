import React, { useContext, useState } from 'react';

import { CartContext } from '../../src/contexts/CartContext';

import { Link } from 'next/link';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Checkout() {
  const { total, cartItems, checkout, handleCheckout } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div>
      <div>Checkout Page</div>
      <div>Total: {total}</div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup aria-label="payment-method" name="payment-method" value={paymentMethod} onChange={handleChange}>
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        </RadioGroup>
      </FormControl>
      <Button>Checkout</Button>
    </div>
  );
}
