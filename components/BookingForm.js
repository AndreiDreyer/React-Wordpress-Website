import React, { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReCaptchaComp from '../components/ReCaptchaComp';
import { ColorLensOutlined } from '@material-ui/icons';

import { borders } from '@material-ui/system';

import { customTheme } from '../src/theme';


const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: '2rem',
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    minWidth: 280,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // height: 900,
  },
  cComp: {
    marginTop: '1rem',
  },
  button: {
    background: '#ffd065',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    // boxShadow: '0 3px 5px 2px #ffd065',
    marginTop: '1rem',
  },
  text: {
     fontFamily: 'Oswald',
    fontSize: '17px',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 700,
    lineHeight: '23px', 
    textAlign: 'center',
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
    <form className={classes.root} onSubmit={handleSubmit} border={1} borderColor={'#f7f2df'}>
      <br />
      <div className={classes.text} style={{ fontSize: '1.3rem'}}>
        <h3>Book a shoot by filling out the following</h3>
        <h3> and we will get in contact with you</h3>
        <div>
          <TextField
            name="name"
            id="name"
            value={values.name}
            className={classes.textField}
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
