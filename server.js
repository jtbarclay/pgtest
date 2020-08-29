//web server init
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route includes
const testRouter = require('./test.router');

//routes
app.use('/', testRouter);

//heroku provides the port as an environment variable, otherwise runs on localhost:5000
const PORT = process.env.PORT || 5000;

//starts web server
http.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});