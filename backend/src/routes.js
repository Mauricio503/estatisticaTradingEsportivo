const{ Router } = require('express');
const EstrategiaController = require("./controller/EstrategiaController");

const routes = Router();

routes.get("/estrategia/odd120a150", EstrategiaController.odd120a150);
routes.post("/estrategia/pesquisa", EstrategiaController.pesquisa);

module.exports = routes;