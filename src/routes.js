const express = require('express');
const routes = express.Router();

const DadosController = require('./controller/DadosController');

routes.get("/teste", DadosController.index);

//exporta
module.exports = routes;