import React from 'react';
import styled from 'styled-components';

import SEO from '../components/seo';
import Button from '../components/button';
import SiteHeader from '../components/siteHeader';
import PageContainer from '../components/pageContainer';



const ConfirmationPageWrapper = styled.section`
  margin: 0 auto;
  content {
    margin: 25px auto 44px;
    display: block;
  }
  a {
    display: block;
  }
  p {
    margin-bottom: 26px;
  }
  @media only screen and (min-width: 576px) {
    max-width: 580px;
    h1 {
      font-size: 60px;
    }
  }
`
const ConfirmationPage = props => {
  const backBtnHandler = () => window.location.href = 'https://www.tamaramellon.com/';

  return (
    <>
      <SEO title="Cobbler Concierge Confirmation Page" />
      <SiteHeader />

      <ConfirmationPageWrapper>
        <PageContainer>

          <header>
            <h1>Request Completed</h1>
          </header>

          <content>
            <h2>Check your inbox.</h2>
            <p>A pre-paid label will arrive shortly in your email inbox. Print the label, pop your shoes in a box, and drop off at any FedEx drop off location.
              <a href='http://www.fedex.com/us/dropbox/'>Find Fedex dropoff locations</a>
            </p>
            <h2>How long will it take?</h2>
            <p>About two weeks. We’ll send you an email once we receive your shoes, and again when they’re on their way back.</p>
          </content>

          <Button
            btnClass="secondary"
            onClick={backBtnHandler}
            btnText="Back to Tamaramellon.com"
          />
        </PageContainer>
      </ConfirmationPageWrapper>
    </>
  )
}


export default ConfirmationPage;
