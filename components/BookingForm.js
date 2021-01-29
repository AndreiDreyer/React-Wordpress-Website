import React from 'react'
import Swal from 'sweetalert2'

export default function BookingForm(){
    // constructor(props) {
    //     super(props);
        const state = { feedback: '',
                      name: '',
                      email: '' 
                     };
      }
      // saves the user's name entered to state
      const nameChange = (event) => {
        state = setState({name: event.target.value})
      }
      
      // saves the user's email entered to state
      const emailChange = (event) => {
        state = setState({email: event.target.value})
      }

      // saves the user's message entered to state
      const messageChange = (event) => {
        state = setState({feedback: event.target.value})
      }

      //onSubmit of email form
      const handleSubmit = (event) => {
        event.preventDefault();

        //This templateId is created in EmailJS.com
        const templateId = 'template_vz2845l';
    
        //This is a custom method from EmailJS that takes the information 
        //from the form and sends the email with the information gathered 
        //and formats the email based on the templateID provided.
        sendFeedback(templateId, {
                                        message: this.state.feedback, 
                                        name: this.state.name, 
                                        email: this.state.email
                                       }
                         )

      }
    
      //Custom EmailJS method
      const sendFeedback = (templateId, variables) => {
        window.emailjs.send(
          'gmail', templateId,
          variables
          ).then(res => {
            // Email successfully sent alert
            Swal.fire({
              title: 'Email Successfully Sent',
              icon: 'success'
            })
          })
          // Email Failed to send Error alert
          .catch(err => {
            Swal.fire({
              title: 'Email Failed to Send',
              icon: 'error'
            })
            console.error('Email Error:', err)
          })
      }
    
      // render() {
        return (
          
          //Form layout that requires a Name, Email, and message
          <form className="test-mailing" onSubmit={handleSubmit}>

            <br/>
            <div style={{fontSize: "1.2rem"}}>

              <h6>You can also send me an email directly from here</h6>
              <div>
                  <label htmlFor="name">Name</label>
                  <input className="form-control email-inputs" name="user_name" type="text" 
                    id="name" onChange={nameChange} required/>
              </div>

              <div>
                  <label htmlFor="email">Email</label>
                  <input className="form-control email-inputs" name="user_email" type="text"
                    id="email" onChange={emailChange} required/>
              </div>

              <label htmlFor="message">
                  Message
              </label>
              <div>
                <textarea
                  id="message"
                  name="message"
                  onChange={messageChange}
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