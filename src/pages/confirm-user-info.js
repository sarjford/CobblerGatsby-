import React from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/seo';
import { AppContext } from '../components/Context';
import Field from '../components/userInfoField';
import Button from '../components/button';
import Navigation from '../components/navigation';
import PageContainer from '../components/pageContainer';
import SpinnerPopup from '../components/spinnerPopup';
import ContactUs from '../components/contactUs';


const ThisPageContainer = styled.div`
  max-width: 572px;
  margin: 0 auto;

  input {
    &.input-box-error {
      border: 1px solid #ff6d6d;
      & + div:after {
        content: "Please enter a value";
        display: block;
        position: relative;
        color: #ff6d6d;
        width: 100%;
        font-family: 'Futura', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        font-size: 13px;
        margin-bottom: 10px;
      }
    }
  }

  @media only screen and (min-width: 576px) {
    .contact-field-container {
      display: grid;
      grid-template-columns: auto auto;
      grid-column-gap: 10px;
      margin-bottom: 10px;
    }
    .full-width-field {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    button {
      max-width: 300px;
      margin: 0 auto;
    }
  }
`

const Unsuccessful = styled.div`
  margin-bottom: 30px;

  p, h2, a {
    color: #ff6d6d;
    font-size: 14px;
  }

  .contact h2 {
    margin-bottom: 0;
  }

  span {
    cursor: pointer;
    color: #ff6d6d;
    text-decoration: underline;
  }
  > div {
    margin: 0 auto;
  }
`

const UnsuccessfulSubmissionPopup = props => {
  const startOver = () => {
    navigate('/');
  }
  return (
    <Unsuccessful>
      <p>There was an issue processing your request. Review your information below, try submitting a <span onClick={startOver}>new request</span> or reach out to our client services team for futher assistance.</p>
      <ContactUs />
    </Unsuccessful>
  )
}

export default class Info extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    }
  }
  static contextType = AppContext;

  createOrderObj = () => {
    const appState = this.context;
    const appStateData = appState.data;
    let result = { order: {} };

    function OrderAttributes(creator, orderNum, firstName, lastName, phone, email){
      this.channel = 'tm';
      this.store_name = 'API';
      this.creator = creator;
      this.ref_number = orderNum;
      this.customer_first_name = firstName;
      this.customer_last_name = lastName;
      this.phone = phone;
      this.email = email;
    }
    function OrderAddress(address1, address2, city, state, zip){
      this.line1 = address1;
      this.line2 = address2;
      this.city = city;
      this.state = state;
      this.zip = zip;
    }
    function OrderLineItem(variant, repairIds, size){
      this.category = 'womens';
      this.associate_comments = variant;
      this.repair_ids = repairIds;
      this.size = size;
    }

    result.order['attributes'] = new OrderAttributes(
      `${appStateData.first_name} ${appState.data.last_name}`,
      appStateData.data[0].order,
      appStateData.first_name,
      appStateData.last_name,
      appStateData.phone,
      appStateData.email
    );

    result.order['order_address_attributes'] = new OrderAddress(
      appStateData.address1,
      appStateData.address2,
      appStateData.city,
      appStateData.province,
      appStateData.zip,
      appStateData.phone
    );

    result.order['line_items_attributes'] = { 0: new OrderLineItem(
      appStateData.data[appStateData.selectedShoeIndex].variant,
      appStateData.selectedRepairs,
      appStateData.data[appStateData.selectedShoeIndex].options.split(' / ')[1]
    )};

    return result;
  }

  submitOrder = (e) => {
    e.preventDefault();
    const orderObject = this.createOrderObj();
    console.log(orderObject)

    if (this.state.error) {
      return;
    }

    this.setState({ loading: true });

    fetch(`/.netlify/functions/order`, {
        method: 'POST',
        body: JSON.stringify(orderObject)
      })
      .then(response => response.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          console.log('successful post to api')
          // window.scrollTo(0, 0);
          navigate('/confirmation-page');
        } else {
          console.log('unsuccessful post to api')
          this.setState({ loading: false, error: true });
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false, error: true });
      });
  }

  updateInputValue = (e) => {
    const appState = this.context;
    appState.set({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const appState = this.context;

    return (
      <>
        <SEO title="Confirm User Info Page" />
        <Navigation />
        <PageContainer>
          <ThisPageContainer>

            {this.state.error && <UnsuccessfulSubmissionPopup />}

            <header className="step-page-header">
              <h2>Confirm your contact and shipping information:</h2>
            </header>

            <div className="contact-field-container">

              <Field
                placeholder="First Name*"
                name="first_name"
                value={appState.data.first_name}
                onChange={this.updateInputValue}
                error={appState.data.first_name.length > 0 ? false : true}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Last Name*"
                name="last_name"
                value={appState.data.last_name}
                onChange={this.updateInputValue}
                error={appState.data.last_name.length > 0 ? false : true}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Address Line 1*"
                name="address1"
                value={appState.data.address1}
                onChange={this.updateInputValue}
                error={appState.data.address1.length > 0 ? false : true}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

              <Field
                placeholder="Address Line 2"
                name="address2"
                value={appState.data.address2}
                onChange={this.updateInputValue}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

              <Field
                placeholder="City*"
                name="city"
                value={appState.data.city}
                onChange={this.updateInputValue}
                error={appState.data.city.length > 0 ? false : true}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

              <Field
                placeholder="State*"
                name="province"
                value={appState.data.province}
                onChange={this.updateInputValue}
                error={appState.data.province.length > 0 ? false : true}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Zip*"
                name="zip"
                value={appState.data.zip}
                onChange={this.updateInputValue}
                error={appState.data.zip.length > 0 ? '' : 'error'}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Phone*"
                name="phone"
                value={appState.data.phone}
                onChange={this.updateInputValue}
                error={appState.data.phone.length > 0 ? '' : 'error'}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

            </div>

            <Button
              btnClass="primary"
              onClick={this.submitOrder}
              btnText="Submit Request"
            />
          </ThisPageContainer>
        </PageContainer>
        {this.state.loading && <SpinnerPopup />}
      </>
    );
  }
}
