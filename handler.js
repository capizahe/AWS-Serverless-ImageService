const awsServerlessExpress = require('aws-serverless-express-binary');
const app = require('./src/index');

const server = awsServerlessExpress.createServer(app);


exports.handler = (event, context) =>{
  return awsServerlessExpress.proxy(server,event,context);
}
