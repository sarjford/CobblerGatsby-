import React from "react"
import { navigate } from "gatsby"
import axios from 'axios';

import indexStyles from "./index.module.scss"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import { AppContext } from '../components/Context';

import Field from '../components/userInfoField';
import Button from '../components/button';



export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      errorClassName: 'no-error',
      loading: false
    }
    this.submitBtnHandler = this.submitBtnHandler.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateZip = this.updateZip.bind(this);
  }

  static contextType = AppContext;
  indexPage = this;

  updateEmail(e){
    const appState = this.context;
    this.setState({ errorClassName: '' });
    appState.set({
      email: e.target.value
    });
  }

  updateZip(e) {
    const appState = this.context;
    this.setState({ errorClassName: '' });
    appState.set({
      zip: e.target.value
    });
  }

  submitBtnHandler(e) {
    e.preventDefault();
    const appState = this.context;
    const email = appState.data.email;
    const zip = appState.data.zip;

    const validateEmail = (email) => {
      const rgxPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return rgxPattern.test(email);
    }

    const validateZip = (zip) => {
      const rgxPattern = new RegExp(/^\d{5}$|^\d{5}-\d{4}$/);
      return rgxPattern.test(zip);
    }

    const fetchOrders = (email, zip) => {
      axios
        .get(`http://l.tamaramellon.com/api/returns/users?email=${email}&pc=${zip}`)
        .then(orders => {
          console.log('orders ', orders)
          appState.set({ data: orders.data });
          navigate('/select-a-shoe');
        })
        .catch(error => {
          console.log(error)
          this.setState({
            errorMsg: error.response.text,
            errorClassName: 'email-error',
            loading: false
          });
        })
      }

    if (!validateEmail(email) || !validateZip(zip)) {
      console.log('invalid email or zip')
      this.setState({
        errorMsg: 'Please enter a valid email address and/or zip code.',
        errorClassName: 'email-error'
      });
      return;
    }

    this.setState({ errorMsg: '', errorClassName: '', loading: true });

    fetchOrders(email, zip);
  }

	render() {
    const appState = this.context;

		return (
      <>
        <SEO title="Home" />

        <section className={indexStyles.homepage}>
          <div className="homepage" id="start-your-service">
            {
              // <NavBar />
            }

            <div className="home__hero">
              <picture>
                <source media="(min-width: 1024px)" srcSet="https://cdn.shopify.com/s/files/1/1103/4464/files/Cobbler_Care_large_1.jpg?772610"/>
                <source media="(min-width: 768px)" srcSet="https://cdn.shopify.com/s/files/1/1103/4464/files/Cobbler_Care_tablet.jpg?772608"/>
                <img src="https://cdn.shopify.com/s/files/1/1103/4464/files/Cobbler_Care_mobile.jpg?772608" alt="" />
              </picture>
              <h1>Cobbler<br/>Concierge</h1>
            </div>

            <div className="home__content page-container">
              <h1>Cobbler<br/>Concierge</h1>
              <div className="home__form">
                <h3>Start Your Service</h3>
                <p>Enter your email and zip code below to start the care process.</p>
                <form>
                {
                  // <input id="userEmail"
                  //   type="email"
                  //   className={ this.state.errorClassName }
                  //   value={appState.data.email}
                  //   onChange={this.updateEmail}
                  //   placeholder="Email"
                  //   />
                  // <input id="userZip"
                  //   type="text"
                  //   className={this.state.errorClassName}
                  //   value={appState.data.zip}
                  //   onChange={this.updateZip}
                  //   placeholder="Zip code"
                  //   />
                }

                  <Field
                    placeholder="Email"
                    name=""
                    value={appState.data.email}
                    onChange={this.updateEmail}
                    inputClass={this.state.errorClassName}
                    wrapperClass=""
                    id="userEmail"
                    type="email"
                  />

                  <Field
                    placeholder="Email"
                    name=""
                    value={appState.data.zip}
                    onChange={this.updateZip}
                    inputClass={this.state.errorClassName}
                    wrapperClass=""
                    id="userZip"
                    type="text"
                  />

                  <span className={ this.state.errorClassName }>{ this.state.errorMsg }</span>

                  <Button
                    btnClass="primary"
                    onClick={this.submitBtnHandler}
                    btnText="Start Your Service"
                  />
                  {
                    // <button className="btn primary start"
                    //   onClick={ this.submitBtnHandler }>Start Your Service
                    //   {
                    //     // {this.state.loading ? <Loading /> : null}
                    //   }
                    // </button>
                  }

                </form>
              </div>

              {
                // <Content />
              }

              <h6 className='terms'>*Terms & Conditions apply. <a href="https://www.tamaramellon.com/pages/our-info#faq-5-4">More info.</a></h6>

            </div>
          </div>
        </section>
      </>
		);
	}
}
