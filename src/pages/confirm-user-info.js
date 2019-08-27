import React from 'react';
import { navigate } from 'gatsby';

import SEO from '../components/seo';
import { AppContext } from '../components/Context';
import Field from '../components/userInfoField';
import Button from '../components/button';
import Navigation from '../components/navigation';
import PageContainer from '../components/pageContainer';



// import Unsuccessful from './unsuccessful.js';
// import Loading from '../common/loading.js';

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

    // setTimeout(function() {
    //   navigate('/confirmation-page');
    // }, 500)

    // if (window.location.href.indexOf('local') > -1) {
    //   apiUrl = 'http://4071c6b2.ngrok.io/order';
    // } else {
    //   apiUrl = 'https://tm-cobbler.herokuapp.com/order';
    // }
    // request.post(apiUrl)
    //   .send(orderObject)
    //   .set('Accept', 'application/json')
    //   .then(function(res) {
    //     if (JSON.parse(res.body.status) == 200) {
    //       console.log('successful post to api')
    //       window.scrollTo(0, 0);
    //       route('/complete');
    //     } else {
    //       console.log('unsuccessful post to api')
    //       this.setState({ loading: false, error: true });
    //     }
    //
    //   }.bind(this))
    //   .catch(function(err) {
    //     if (err) {
    //       console.log('error', err);
    //     }
    //   }.bind(this));
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
          <section>
            {
              // {this.state.loading ? <Loading /> : null }
              // {this.state.error ? <Unsuccessful startOver={this.startOver} /> : null }
            }

            <header className="step-page-header">
              <h2>Confirm your contact and shipping information:</h2>
            </header>

            <div>

              <Field
                placeholder="First Name*"
                name="first_name"
                value={appState.data.first_name}
                onChange={this.updateInputValue}
                inputClass={appState.data.first_name.length > 0 ? '' : 'error'}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Last Name*"
                name="last_name"
                value={appState.data.last_name}
                onChange={this.updateInputValue}
                inputClass={appState.data.last_name.length > 0 ? '' : 'error'}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Address Line 1*"
                name="address1"
                value={appState.data.address1}
                onChange={this.updateInputValue}
                inputClass={appState.data.address1.length > 0 ? '' : 'error'}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

              <Field
                placeholder="Address Line 2*"
                name="address2"
                value={appState.data.address2}
                onChange={this.updateInputValue}
                inputClass={appState.data.address2.length > 0 ? '' : 'error'}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

              <Field
                placeholder="City*"
                name="city"
                value={appState.data.city}
                onChange={this.updateInputValue}
                inputClass={appState.data.city.length > 0 ? '' : 'error'}
                wrapperClass="full-width-field"
                id=""
                type=""
              />

              <Field
                placeholder="State*"
                name="province"
                value={appState.data.province}
                onChange={this.updateInputValue}
                inputClass={appState.data.province.length > 0 ? '' : 'error'}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Zip*"
                name="zip"
                value={appState.data.zip}
                onChange={this.updateInputValue}
                inputClass={appState.data.zip.length > 0 ? '' : 'error'}
                wrapperClass=""
                id=""
                type=""
              />

              <Field
                placeholder="Phone*"
                name="phone"
                value={appState.data.phone}
                onChange={this.updateInputValue}
                inputClass={appState.data.phone.length > 0 ? '' : 'error'}
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
          </section>
        </PageContainer>
      </>
    );
  }
}
