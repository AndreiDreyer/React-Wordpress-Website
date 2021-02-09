import React, { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReCaptchaComp from '../components/ReCaptchaComp';
import { ColorLensOutlined } from '@material-ui/icons';

import { borders } from '@material-ui/system';

import { customTheme } from '../src/theme';


const useStyles = makeStyles((theme) => ({
  textField: {
    [theme.breakpoints.up("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: '0.5rem',
      minWidth: 280,
    },
    [theme.breakpoints.up("md")]: {
      marginTop: '2rem',
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: '2rem',
    },
    [theme.breakpoints.up("xl")]: {
      marginTop: '2rem',
    },
      minWidth: 280,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: '#f7f2df',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'red',
  },
  cComp: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    [theme.breakpoints.up("xs")]: {
      marginTop: '2rem',
    },
    background: '#ffd065',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '2rem',
  },
  text: {
    //  fontFamily: 'Whitefeather',
     fontFamily: 'Oswald Regular',
     fontSize: 1,
     color: '#f7f2df',
     marginTop: 0,
    //  fontFamily: 'Loves',
  },
  formHeader: {
    fontFamily: 'Oswald Regular',
    fontSize: '2rem',
  },
}));


const BOOKING_TEMPLATE_ID = process.env.BOOKING_TEMPLATE_ID;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;

export default function BookingForm() {
  const classes = useStyles();

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset, isValid, dirty } = useFormik({
    initialValues: {
      name: '',
      email: '',
      location: '',
      dateTime: new Date(),
      feedback: '',
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Please enter your name'),
      email: Yup.string().email('Please enter a valid email').required('Please enter your email'),
      location: Yup.string().required('Please enter your location'),
      dateTime: Yup.date().required('Please enter a booking date'),
      feedback: Yup.string().required('Please enter a message'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      const templateId = BOOKING_TEMPLATE_ID;

      console.log(dateTime);

      //This is a custom method from EmailJS that takes the information
      //from the form and sends the email with the information gathered
      //and formats the email based on the templateID provided.

      sendFeedback(templateId, {
        message: values.feedback,
        from_name: values.name,
        reply_to: values.email,
        location: values.location,
        dateTime: values.dateTime,
      });
    },
  });

  //Custom EmailJS method
  const sendFeedback = (templateId, variables) => {
    emailjs
      .send(EMAILJS_SERVICE_ID, templateId, variables, EMAILJS_USER_ID)
      .then((res) => {
        // Email successfully sent alert
        Swal.fire({
          title: 'Email Successfully Sent',
          icon: 'success',
        });
      })
      // Email Failed to send Error alert
      .catch((err) => {
        Swal.fire({
          title: 'Email Failed to Send',
          icon: 'error',
        });
        console.error('Email Error:', err);
      });
  };

  return (
    //Form layout that requires a Name, Email, and message
    <form className={classes.root} onSubmit={handleSubmit} border={1}>
      <Typography className={classes.formHeader} variant="h1" />
      <br />
      <div className={classes.text} style={{ fontSize: '1.3rem'}}>
        <Typography>Book a shoot by filling out the following and we will get in contact with you</Typography>
        <div>
          <TextField
            name="name"
            id="name"
            value={values.name}
            className= {classes.textField}
            InputProps={{
              className: classes.textField
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="standard"
            helperText={touched.name ? errors.name : ''}
            error={touched.name && !!errors.name}
          />
        </div>
        <div>
          <TextField
            required
            name="email"
            id="email"
            variant="standard"
            label="Email"
            className={classes.textField}
            InputProps={{
              className: classes.textField
            }}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email ? errors.email : ''}
            error={touched.email && !!errors.email}
          />
        </div>
        <div>
          <TextField
            required
            name="location"
            id="location"
            variant="standard"
            label="Location of Shoot"
            className={classes.textField}
            InputProps={{
              className: classes.textField
            }}
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.location ? errors.location : ''}
            error={touched.location && !!errors.location}
          />
        </div>
        <div>
          <TextField
            required
            id="dateTime"
            label="Next appointment"
            type="datetime-local"
            name="dateTime"
            className={classes.textField}
            InputProps={{
              className: classes.textField
            }}
            value={values.dateTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div>
          <TextField
            required
            multiline
            id="feedback"
            name="feedback"
            variant="standard"
            label="Message"
            className={classes.textField}
            InputProps={{
              className: classes.textField
            }}
            multiline="True"
            rowsMax="5"
            value={values.feedback}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.feedback ? errors.feedback : ''}
            error={touched.feedback && !!errors.feedback}
          />
        </div>
        <div className={classes.cComp}>
          <ReCaptchaComp></ReCaptchaComp>
        </div>
      </div>
      <Button className={classes.button} type="submit" color="primary">
        Send Mail
      </Button>
    </form>
  );
}
