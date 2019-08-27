const axios = require('axios')
const https = require('https');

export function handler(event, context, callback) {

  const data = JSON.parse(event.body);
  console.log(data)

  axios({
    method: 'post',
    url: 'https://orders.cobblerconcierge.com/api/partners/tm/orders',
    data: data,
    headers: {
      'Authorization': 'enzy9PvHnnuBJo2mHosLQQCq',
      'Accept': 'application/vnd.CcOps.v1, application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
  }).then(function(response) {
    console.log('RESPONSE!: ', JSON.stringify(response.data))
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    })
  })
    .catch((error) => {
      console.error('ERROR!: ', error)
      callback(error)
  });
}
