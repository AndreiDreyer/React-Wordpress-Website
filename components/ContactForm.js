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
import { withWidth } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  textField: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: '0.5rem',
      minWidth: 20,
    },
    [theme.breakpoints.down("md")]: {
      marginTop: '1rem',
    },
    [theme.breakpoints.up("md")]: {
      marginTop: '2rem',
    },
      minWidth: 280,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: 'black',
      fontSize: 20,
  },
  dateField: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: '0.5rem',
    },
    [theme.breakpoints.down("md")]: {
      marginTop: '1rem',
    },
    [theme.breakpoints.up("md")]: {
      marginTop: '2rem',
    },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      color: 'black',
      fontSize: 20,
  },
  root: {
    [theme.breakpoints.down("xs")]: {
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'right',
    alignItems: 'center',
    alignContent: 'center',
  },
  cComp: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    justifyContent: 'right',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      marginTop: '0.2rem',
    },
    [theme.breakpoints.down("md")]: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    background: '#ffd065',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 48,
    padding: '0 30px',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  text: {
     fontFamily: 'Oswald Regular',
     fontSize: 1,
     marginTop: 0,
  },
  formHeader: {
    fontFamily: 'Oswald Regular',
    fontSize: '2rem',
  },
}));


const BOOKING_TEMPLATE_ID = process.env.BOOKING_TEMPLATE_ID;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;

function ContactForm(props) {
  const classes = useStyles();
  const { width } = props;
  console.log(width)
  const lgThanMd = width === 'sm' || width === 'xs';
  console.log(lgThanMd)

  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset, isValid, dirty } = useFormik({
    initialValues: {
      name: '',
      email: '',
      feedback: '',
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Please enter your name'),
      email: Yup.string().email('Please enter a valid email').required('Please enter your email'),
      feedback: Yup.string().required('Please enter a message'),
    }),

    onSubmit: (values, { setSubmitting }) => {
      const templateId = BOOKING_TEMPLATE_ID;

      //This is a custom method from EmailJS that takes the information
      //from the form and sends the email with the information gathered
      //and formats the email based on the templateID provided.

      sendFeedback(templateId, {
        message: values.feedback,
        from_name: values.name,
        reply_to: values.email,
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
        <Typography>Get in contact with us, we'd love to hear from you. </Typography>
        <div>
          <TextField
            required
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
            rowsMax="4"
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
export default withWidth() (ContactForm)