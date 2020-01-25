const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3330);
