const{ Router } = require('express');
const EstrategiaController = require("./controller/EstrategiaController");

const routes = Router();

routes.get("/estrategia/odd120a150", EstrategiaController.odd120a150);


module.exports = routes;