import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import Button from '../components/button';


const Index__Text = styled.section`
  margin-bottom: 24px;
  .cobbler-steps {
    margin: 20px auto 30px;
    h2 {
      margin-bottom: 8px;
    }
  }
`
const IndexPageText = function(props) {

  const startBtnHandler = () => navigate('#start-your-service');

  const shoppingBtnHandler = () => window.location.href = 'https://www.tamaramellon.com/collections/all?origin=cobbler';

  return (
    <Index__Text>
      <h3>Tender Loving Shoe Care</h3>
      <p>Everything we make is guaranteed with care for up to two years under our Cobbler Concierge service. And we cover all shipping costs. From start to finish, the whole process only takes about two weeks.</p>

      <h3>Available Services</h3>
      <ul>
        <li>Cleaning</li>
        <li>Minor scuffs</li>
        <li>Heel tip replacement</li>
        <li>Hardware Replacement</li>
      </ul>

      <h3>How It Works</h3>
      <div className="cobbler-steps">
        <h2>1. Send</h2>
        <p>Enter your email address below to request a free shipping label. Box your shoes and send them to us.</p>
        <h2>2. Care</h2>
        <p>Expert cobblers restore your shoes with top-quality craftsmanship and care in 2 weeks.</p>
        <h2>3. Return</h2>
        <p>Your favorite shoes arrive back at your doorstep, good as new and ready to take on the world.</p>
      </div>

      <Button
        btnClass="primary"
        onClick={startBtnHandler}
        btnText="Start Your Service"
      />

      <Button
        btnClass="secondary"
        onClick={shoppingBtnHandler}
        btnText="Back To Shopping"
      />

    </Index__Text>
  )
}

export default IndexPageText;
