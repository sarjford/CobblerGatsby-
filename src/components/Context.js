import React from 'react';

const initialState = {
  data: {
    selectedShoeIndex: 0,
    selectedRepairs: [],
    email: '',
    zip: '',
    data: [],
    history: [],
    imagesLoaded: 0
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
    console.log('inside app provider ', this.state)
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { AppConsumer, AppProvider, AppContext }
