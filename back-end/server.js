const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./src/routers');

const app = express();
app.use(cors());
require('dotenv').config();

const port = 3001;
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log('listening to the door ', port);
});
