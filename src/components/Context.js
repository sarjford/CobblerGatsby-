import React from 'react';

const initialState = {
  data: {
    address1: "",
    address2: "",
    city: "",
    company: "",
    country_code: "",
    country_name: "",
    customer_id: 0,
    data: [{
      customer: {},
      date: "",
      imageId: 0,
      imageSrc: "",
      name: "",
      options: "",
      order: 0,
      price: "",
      product: 0,
      refunds: [],
      variant: 0
    }],
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    phone: "",
    province: "",
    province_code: "",
    selectedRepairs: [],
    selectedShoeIndex: 0,
    zip: ""
  },
  set: () => {},
}

const AppContext = React.createContext(initialState);
const Provider = AppContext.Provider;
const AppConsumer = AppContext.Consumer;

class AppProvider extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this);
    this.state = {
      ...initialState,
      set: this.setData,
    }
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { AppConsumer, AppProvider, AppContext }
