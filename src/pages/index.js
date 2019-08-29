import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/seo';
import { AppContext } from '../components/Context';
import SiteHeader from '../components/siteHeader';
import IndexPageText from '../components/indexTextContent';
import Field from '../components/userInfoField';
import Button from '../components/button';
import SpinnerPopup from '../components/spinnerPopup';



const DesktopHeader = styled.h1`
  display: none;
  @media only screen and (min-width: 1024px) {
    display: block;
    font-size: 3.5rem;
  }
`;
const IndexPageLayout = styled.div`
  h3 {
    margin: 22px auto 12px;
  }
  @media only screen and (min-width: 768px) {
    h3 {
      margin: 36px auto 12px;
    }
  }
  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 512px 1fr;
    grid-template-rows: auto 1fr;
    div:nth-child(1) {
      order: 2;
    }
    div:nth-child(2) {
      order: 1;
      grid-row: 1 / 3;
    }
    div:nth-child(3) {
      order: 3;
    }
  }
  @media only screen and (min-width: 1440px) {
    grid-template-columns: 800px 1fr;
    max-width: 1600px;
      margin: 0 auto;
  }
`;

const IndexPageHeroSection = styled.div`
  position: relative;
  img {
    width: 100%;
    display: block;
  }
`;
const IndexPageForm = styled.div`
  margin-bottom: 36px;
  margin-top: 24px;
  span.form-error {
    font-size: .875rem;
    color: #ff6d6d;
    margin-bottom: 10px;
    display: block;
  }
  /* input.email-error {
    border: 1px solid #ff6d6d;
  } */
  @media only screen and (min-width: 768px) {
    margin-bottom: 48px;
  }
`;
const IndexPageContent = styled.div`
  padding: 25px 20px;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    max-width: 500px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 0px 20px 20px;
  }
  @media only screen and (min-width: 1024px) {
    padding: 0 40px;
  }
`;
const MobileHeader = styled.h1`
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 768px) {
    font-size: 3.75rem;
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      emailError: '',
      zipError: '',
      loading: false
    }
  }

  static contextType = AppContext;
  indexPage = this;

  updateEmail = (e) => {
    const appState = this.context;
    this.setState({ errorClassName: '' });
    appState.set({
      email: e.target.value
    });
  }

  updateZip = (e) => {
    const appState = this.context;
    this.setState({ errorClassName: '' });
    appState.set({
      zip: e.target.value
    });
  }

  submitBtnHandler = (e) => {
    e.preventDefault();
    const appState = this.context;
    const email = appState.data.email;
    const zip = appState.data.zip;

    const validateFields = (email, zip) => {
      const stateObject = {};

      const validateEmail = (email) => {
        const rgxPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return rgxPattern.test(email);
      }

      const validateZip = (zip) => {
        const rgxPattern = new RegExp(/^\d{5}$|^\d{5}-\d{4}$/);
        return rgxPattern.test(zip);
      }

      if (!validateEmail(email)) {
        Object.assign(stateObject, {
          errorMsg: 'Please enter a valid email address.',
          emailError: true
        });
      }

      if (!validateZip(zip)) {
        Object.assign(stateObject, {
          errorMsg: 'Please enter a valid zip code.',
          zipError: true
        });
      }

      if (!validateEmail(email) && !validateZip(zip)) {
        Object.assign(stateObject, {
          errorMsg: 'Please enter a valid email address and/or zip code.'
        });
      }

      return stateObject;
    }

    const fetchOrders = (email, zip) => {
      fetch(`/.netlify/functions/user?email=${email}&pc=${zip}`)
        .then(response => response.json())
        .then(data => {
          const orders = JSON.parse(data);

          console.log(orders)

          if (orders.length === 0) {
            this.setState({
              errorMsg: 'No orders found. Please check your email and/or zip code and try again. For futher assistance, call our customer service team at (866) 419-5500.',
              loading: false
            });
            return;
          }

          appState.set({
            ...orders[0].customer,
            data: orders
          });
          navigate('/select-a-shoe');
        })
        .catch(err => {
          const error = JSON.parse(err);
          console.log(error)
          this.setState({
            errorMsg: error.response.text,
            loading: false
          });
        });
      }

    // if there are errors, update state and exit function
    const errorCheck = validateFields(email, zip);
    if (Object.keys(errorCheck).length > 0) {
      this.setState(errorCheck);
      return;
    }
    // otherwise, continue
    this.setState({
      emailError: false,
      zipError: false,
      errorMsg: '',
      loading: true
    });
    fetchOrders(email, zip);
  }

	render() {
    const appState = this.context;

		return (
      <>
        <SEO title="Home" />
        <IndexPageLayout id="start-your-service">

          <SiteHeader />

          <IndexPageHeroSection>

          <picture>
            <source media="(min-width: 1024px)" srcSet="https://cdn.shopify.com/s/files/1/1103/4464/files/Cobbler_Care_large_1.jpg?772610"/>
            <source media="(min-width: 768px)" srcSet="https://cdn.shopify.com/s/files/1/1103/4464/files/Cobbler_Care_tablet.jpg?772608"/>
            <img src="https://cdn.shopify.com/s/files/1/1103/4464/files/Cobbler_Care_mobile.jpg?772608" alt="" />
          </picture>

            <MobileHeader>Cobbler<br/>Concierge</MobileHeader>
          </IndexPageHeroSection>

          <IndexPageContent>
            <DesktopHeader>Cobbler<br/>Concierge</DesktopHeader>
            <IndexPageForm>
              <h3>Start Your Service</h3>
              <p>Enter your email and zip code below to start the care process.</p>
              <form className="field-parent">
                <Field
                  placeholder="Email"
                  name=""
                  value={appState.data.email}
                  onChange={this.updateEmail}
                  error={this.state.emailError}
                  wrapperClass=""
                  id="userEmail"
                  type="email"
                />
                <Field
                  placeholder="Zip Code"
                  name=""
                  value={appState.data.zip}
                  onChange={this.updateZip}
                  error={this.state.zipError}
                  wrapperClass=""
                  id="userZip"
                  type="text"
                />
                <span
                  className={this.state.errorMsg.length ? 'form-error' : ''}>
                  {this.state.errorMsg}
                </span>

                <Button
                  btnClass="primary"
                  onClick={this.submitBtnHandler}
                  btnText="Start Your Service"
                />
              </form>
            </IndexPageForm>

            <IndexPageText />

            <h6 className="terms">*Terms & Conditions apply. <a href="https://www.tamaramellon.com/pages/our-info#faq-5-4">More info.</a></h6>
          </IndexPageContent>

        </IndexPageLayout>

        {this.state.loading && <SpinnerPopup />}
      </>
		);
	}
}
