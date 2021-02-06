import React, { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import ReCaptchaComp from '../components/ReCaptchaComp'
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    //   overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BookingForm() {
  const classes = useStyles();

  const [{ feedback, name, email, location }, setEmailInformation] = useState({
    feedback: 'Hi I would like to enquire about a booking.',
  });

  const [dateTime, setDateTime] = useState(new Date());

  const handleFormChange = (key) => (e) => {
    const { value } = e.target;

    setEmailInformation((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const handleDate = (e) => {
    console.log('The method was called successfully!!!!!');
    setDateTime(e.target.value);
  };

  //onSubmit of email form
  const handleSubmit = (event) => {
    event.preventDefault();

    //This templateId is created in EmailJS.com
    const templateId = 'template_vz2845l';

    console.log(dateTime);

    //This is a custom method from EmailJS that takes the information
    //from the form and sends the email with the information gathered
    //and formats the email based on the templateID provided.

    sendFeedback(templateId, {
      message: 'Location: '+location+'\n'+'Date and Time: '+dateTime+'\n'+'Email: '+email+' \n'+feedback,
      from_name: name,
      reply_to: email,
      location: location,
      dateTime: dateTime,
    });
  };

  //Custom EmailJS method
  const sendFeedback = (templateId, variables) => {
    emailjs
      .send(
        'service_g4avd9d',
        templateId,
        variables,
        'user_lC9vwp5sWdhMgCMhLtIsK',
      )
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
    <form className={classes.root} onSubmit={handleSubmit}>
      <br />
      <div style={{ fontSize: '1.2rem' }}>
        <h6>You can also send me an email directly from here</h6>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="form-control email-inputs"
            name="user_name"
            type="text"
            id="name"
            value={name}
            onChange={handleFormChange('name')}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            className="form-control email-inputs"
            name="user_email"
            type="text"
            id="email"
            value={email}
            onChange={handleFormChange('email')}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location of Shoot</label>
          <input
            className="form-control email-inputs"
            name="user_location"
            value={location}
            type="text"
            id="location"
            onChange={handleFormChange('location')}
            required
          />
        </div>
        <div>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            className={classes.textField}
            value={dateTime}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDate}
          />
        </div>
        <label htmlFor="message">Message</label>
        <div>
          <textarea
            id="message"
            name="message"
            value={feedback}
            onChange={handleFormChange('feedback')}
            placeholder="Put your message here"
            required
            className="email-text-area form-control"
            rows="15"
            cols="20"
          />
        </div>
      <div>
        <ReCaptchaComp></ReCaptchaComp>
      </div>
      </div>
      <button type="submit" value="Submit" className="btn btn-outline-light">Send Mail</button>
    </form>
  );
}
