import React, { useContext } from 'react';
import { Formik, withFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { CartContext } from '../src/contexts/CartContext';

import PaypalButton from './PaypalButtons';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '1rem',
    width: '25ch',
  },
  gridItem: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
});
const form = (props) => {
  const { classes, values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;

  const { total } = useContext(CartContext);

  const onSuccess = () => {};

  return (
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
        error={touched.firstName && Boolean(errors.firstName)}
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
        error={touched.surname && Boolean(errors.surname)}
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
        error={touched.addressLine1 && Boolean(errors.addressLine1)}
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
        error={touched.city && Boolean(errors.city)}
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
        error={touched.province && Boolean(errors.province)}
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
        error={touched.country && Boolean(errors.country)}
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
        error={touched.email && Boolean(errors.email)}
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
        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
      />
      {Form.isValid ? (
        <div>
          <p>Valid Form</p>
        </div>
      ) : (
        <div>
          <p>Invalid Form</p>
        </div>
      )}
      <Button type="submit" color="primary">
        Checkout
      </Button>
      <PaypalButton paymentAmount={total}></PaypalButton>
    </form>
  );
};

const Form = withFormik({
  mapPropsToValues: ({ firstName, surname, addressLine1, city, province, country, email, phoneNumber }) => {
    return {
      firstName: firstName || '',
      surname: surname || '',
      addressLine1: addressLine1 || '',
      city: city || '',
      province: province || '',
      country: country || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    addressLine1: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    province: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    email: Yup.string().email('Enter a valid Email').required('Required'),
    phoneNumber: Yup.number().required('Required'),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    console.log('Submitting');
    console.log(values);
  },
})(form);

export default withStyles(useStyles)(Form);
