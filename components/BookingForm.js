import React, { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  // constructor(props) {
  //     super(props);
  const[{ feedback, name, email }, setEmailInformation] = useState({
    feedback: 'Hi I would like to enquire about a booking.'
  });
  // saves the user's name entered to state
  const nameChange = (event) => {
    state = setState({ name: event.target.value });
  };

  // saves the user's email entered to state
  const emailChange = (event) => {
    state = setState({ email: event.target.value });
  };

  // saves the user's message entered to state
  const messageChange = (event) => {
    state = setState({ feedback: event.target.value });
  };

  const handleFormChange = (key) => (e) => {
    const { value } = e.target;

  setEmailInformation((old) => ({
    ...old,
    [key]: value,
    }));
  };

  //onSubmit of email form
  const handleSubmit = (event) => {
    event.preventDefault();

    //This templateId is created in EmailJS.com
    const templateId = 'template_vz2845l';

    //This is a custom method from EmailJS that takes the information
    //from the form and sends the email with the information gathered
    //and formats the email based on the templateID provided.
    sendFeedback(templateId, {
      message: feedback,
      name: name,
      email: email,
    });
  };

  //Custom EmailJS method
  const sendFeedback = (templateId, variables) => {
    emailjs.send(
      'service_g4avd9d', templateId,
     variables, 'user_lC9vwp5sWdhMgCMhLtIsK'
     ).then(res => {
        // Email successfully sent alert
        Swal.fire({
          title: 'Email Successfully Sent',
          icon: 'success',
        });
      })
      // Email Failed to send Error alert
      .catch(err => {
        Swal.fire({
          title: 'Email Failed to Send',
          icon: 'error',
        });
        console.error('Email Error:', err);
      });
  };

  // render() {
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
            onChange={handleFormChange('email')}
            required
          />
        </div>

        <label htmlFor="message">Message</label>
        <div>
          <textarea
            id="message"
            name="message"
            onChange={handleFormChange('feedback')}
            placeholder="Put your message here"
            required
            className="email-text-area form-control"
            rows="15"
            cols="20"
          />
        </div>
      </div>

      <input type="submit" value="Submit" className="btn btn-outline-light" />
    </form>
  );
}
// }

// export default BookingForm
