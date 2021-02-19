import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, withFormik, useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, withTheme } from '@material-ui/core/styles';

import { CartContext } from '../src/contexts/CartContext';

import PaypalButton from './PaypalButtons';
import { fetchHelper } from '../src/utils';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '1rem',
    width: '25ch',
    alignItems: 'center',
  },
  gridItem: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  button: {
    background: '#252525',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

const form = (props) => {
  const { classes } = props;

  const { total, cartItems } = useContext(CartContext);

  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const onSuccess = async () => {
    const customerData = {
      first_name: values.firstName,
      last_name: values.surname,
      address_1: values.address,
      address_2: '',
      city: values.city,
      state: values.province,
      postcode: '0000',
      country: values.country,
      email: values.email,
      phone: values.phoneNumber,
    };

    const lineItems = cartItems.map((item) => ({ product_id: item.product_id, variation_id: item.id, quantity: item.quantity }));

    const data = {
      payment_method: 'paypal',
      payment_method_title: 'PayPal Standard',
      set_paid: true,
      billing: customerData,
      shipping: customerData,
      line_items: lineItems,
      shipping_lines: [],
    };

    try {
      const res = await fetchHelper('./api/createOrder', 'POST', data);

      if (res.status === 200 || res.status === 201) {
        router.push('/checkout/success');
      } else {
        router.push('/checkout/failure');
      }
    } catch (err) {
      console.log('Error Frontend: ', err);
    } finally {
      setProcessing(false);
    }
  };

  const onProcessing = () => {
    setProcessing(true);
  };
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset, isValid, dirty } = useFormik({
    initialValues: {
      firstName: '',
      surname: '',
      addressLine1: '',
      city: '',
      province: '',
      country: '',
      email: '',
      phoneNumber: '',
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Please enter your first name'),
      surname: Yup.string().required('Please enter your surname'),
      addressLine1: Yup.string().required('Please enter your address'),
      city: Yup.string().required('Please enter your city'),
      province: Yup.string().required('Please enter your province'),
      country: Yup.string().required('Please select your country'),
      email: Yup.string().email('Enter a valid Email').required('Please enter your email'),
      phoneNumber: Yup.number().required('Please enter your phone number'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setProcessing(true);
      const customerData = {
        first_name: values.firstName,
        last_name: values.surname,
        address_1: values.address,
        address_2: '',
        city: values.city,
        state: values.province,
        postcode: '0000',
        country: values.country,
        email: values.email,
        phone: values.phoneNumber,
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
        const res = await fetchHelper('./api/createOrder', 'POST', data);

        if (res.status === 200 || res.status === 201) {
          router.push('/checkout/success');
        } else {
          router.push('/checkout/failure');
        }
      } catch (err) {
        console.log('Error Frontend: ', err);
      } finally {
        setProcessing(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="firstName"
          label="First Name"
          variant="standard"
          name="firstName"
          className={classes.textField}
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.firstName ? errors.firstName : ''}
          error={touched.firstName && !!errors.firstName}
        />
        <TextField
          required
          id="surname"
          label="Surname"
          variant="standard"
          name="surname"
          className={classes.textField}
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.surname ? errors.surname : ''}
          error={touched.surname && !!errors.surname}
        />
        <TextField
          required
          id="addressLine1"
          label="Address Line 1"
          variant="standard"
          name="addressLine1"
          className={classes.textField}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.addressLine1 ? errors.addressLine1 : ''}
          error={touched.addressLine1 && !!errors.addressLine1}
        />
        <TextField
          required
          id="city"
          label="City"
          variant="standard"
          name="city"
          className={classes.textField}
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.city ? errors.city : ''}
          error={touched.city && !!errors.city}
        />
        <TextField
          required
          id="province"
          label="Province"
          variant="standard"
          name="province"
          className={classes.textField}
          value={values.province}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.province ? errors.province : ''}
          error={touched.province && !!errors.province}
        />
        <TextField
          required
          select
          id="country"
          label="Country"
          variant="standard"
          name="country"
          className={classes.textField}
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.country ? errors.country : ''}
          error={touched.country && !!errors.country}
        >
          <MenuItem value="ZIM">Zimbabwe</MenuItem>
        </TextField>
        <TextField
          required
          id="email"
          label="Email Address"
          type="email"
          variant="standard"
          name="email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email ? errors.email : ''}
          error={touched.email && !!errors.email}
        />
        <TextField
          required
          id="phoneNumber"
          label="Phone Number"
          variant="standard"
          name="phoneNumber"
          className={classes.textField}
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.phoneNumber ? errors.phoneNumber : ''}
          error={touched.phoneNumber && !!errors.phoneNumber}
        />
        {isValid && dirty ? (
          <div>
            <Button type="submit" color="primary" className={classes.button}>
              Pay Cash
            </Button>
            <PaypalButton paymentAmount={total} onSuccess={onSuccess} onProcess={onProcessing}></PaypalButton>
          </div>
        ) : (
          <div>
            <p>Please complete form to show payment options</p>
          </div>
        )}
      </form>
      <Dialog open={processing}>
        <DialogTitle id="simple-dialog-title">Processing Order</DialogTitle>
        <CircularProgress />
      </Dialog>
    </div>
  );
};

export default withStyles(useStyles)(form);
