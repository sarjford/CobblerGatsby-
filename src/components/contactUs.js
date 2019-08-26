import React from 'react';
import styled from 'styled-components';


const ContactUsWrapper = styled.section`
  margin-bottom: 22px;
  h2 {
    margin-bottom: 10px;
  }
  .contact {
    margin-bottom: 20px;
  }
`

const ContactUs = props => (
  <ContactUsWrapper>
    <div className="contact">
      <h2>Phone</h2>
      <a href="tel:+18664195500">(866) 419-5500</a>
    </div>
    <div className="contact">
      <h2>Email</h2>
      <a href="mailto:atyourservice@tamaramellon.com">atyourservice@tamaramellon.com</a>
    </div>
  </ContactUsWrapper>
)

export default ContactUs;
