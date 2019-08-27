const http = require('http');
const url = require('url');

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export function handler(event, context, callback) {

  console.log(event)

  // build url
  const requestUrl = url.parse(url.format({
      protocol: 'http',
      hostname: 'l.tamaramellon.com',
      pathname: '/api/returns/users',
      query: event.queryStringParameters
  }));

  console.log(requestUrl)

  http.get({
    hostname: requestUrl.hostname,
    path: requestUrl.path,
  }, (res) => {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      console.log('BODY', body);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
      });
    });

  }).on('error', (e) => {
    console.error(e);
    callback(Error(e))
  });
}
