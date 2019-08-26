import React from 'react';

// const data = JSON.parse(`[{"customer":{"address1":"2820 Sawtelle Boulevard","address2":"Apt 317","city":"Los Angeles","company":"","country_code":"US","country_name":"United States","customer_id":5233726278,"default":true,"first_name":"Sarah","id":5233726278,"last_name":"Ford","phone":"(310) 498-9676","province":"CA","province_code":"CA","zip":"90064"},"date":"2019-04-01T22:43:01","imageId":1960513339488,"imageSrc":"https://cdn.shopify.com/s/files/1/1103/4464/products/Nova_105_Taupe_Suede_Sandal_PDP_1_SIDE.jpg?v=1555622296","name":"Nova - Suede","options":"TAUPE / 36.0 / 105mm","order":55526,"price":"650.0","product":282659684373,"refunds":[],"variant":3610573635605},{"customer":{"address1":"2820 Sawtelle Boulevard","address2":"Apt 317","city":"Los Angeles","company":"","country_code":"US","country_name":"United States","customer_id":5233726278,"default":true,"first_name":"Sarah","id":5233726278,"last_name":"Ford","phone":"3104989676","province":"CA","province_code":"CA","zip":"90064"},"date":"2018-10-11T18:19:43","imageId":1487588327520,"imageSrc":"https://cdn.shopify.com/s/files/1/1103/4464/products/Jagger_105_Red_Suede_Sandal_PDP_1_SIDE.jpg?v=1555620675","name":"Jagger - Suede","options":"RED / 36.5 / 105mm","order":37084,"price":"475.0","product":8617193030,"refunds":[],"variant":30525289030},{"customer":{"address1":"2820 Sawtelle Boulevard","address2":"Apt 317","city":"Los Angeles","company":"","country_code":"US","country_name":"United States","customer_id":5233726278,"default":true,"first_name":"Sarah","id":5233726278,"last_name":"Ford","phone":"3104989676","province":"CA","province_code":"CA","zip":"90064"},"date":"2018-10-11T18:19:43","imageId":1487588294752,"imageSrc":"https://cdn.shopify.com/s/files/1/1103/4464/products/Frontline_105_Red_Velvet_Sandal_PDP_1_SIDE.jpg?v=1559855268","name":"Frontline 105 - Velvet","options":"RED / 36.5 / 105mm","order":37084,"price":"425.0","product":26683015189,"refunds":[],"variant":257044709397},{"customer":{"address1":"2820 Sawtelle Blvd.","address2":"Apt 317","city":"Los Angeles","company":"","country_code":"US","country_name":"United States","customer_id":5233726278,"default":true,"first_name":"Sarah","id":5233726278,"last_name":"Ford","phone":"(310) 498-9676","province":"CA","province_code":"CA","zip":"90064"},"date":"2018-04-10T23:06:17","imageId":1122209529972,"imageSrc":"https://cdn.shopify.com/s/files/1/1103/4464/products/Neptune_105_Nude_Kidsk…al_PDP_1_Slant_24278_22c53c60-3636-4398-bf37-b6821c98704b.jpg?v=1554174980","name":"Neptune 105 - Capretto","options":"NUDE / 36.0 / 105mm","order":22388,"price":"425.0","product":10877623957,"refunds":[],"variant":45807215893}]
// `)
//
// const userInfo = JSON.parse(`{"address1":"2820 Sawtelle Boulevard","address2":"Apt 317","city":"Los Angeles","company":"","country_code":"US","country_name":"United States","customer_id":5233726278,"default":true,"first_name":"Sarah","id":5233726278,"last_name":"Ford","phone":"(310) 498-9676","province":"CA","province_code":"CA","zip":"90064"}`)

// const initialState = {
//   data: {
//     ...userInfo,
//     selectedShoeIndex: 0,
//     selectedRepairs: [],
//     email: "sford85@gmail.com",
//     zip: '90064',
//     data: data,
//     history: [],
//     imagesLoaded: 0
//   },
//   set: () => {},
// }

const initialState = {
  data: {
    selectedShoeIndex: 0,
    selectedRepairs: [],
    email: "",
    zip: '',
    data: '',
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
