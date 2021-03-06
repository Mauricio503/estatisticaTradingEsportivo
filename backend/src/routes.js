const{ Router } = require('express');
const EstrategiaController = require("./controller/EstrategiaController");

const routes = Router();

routes.post("/estrategia/pesquisa", EstrategiaController.pesquisa);
routes.get("/estrategia/pesquisa", EstrategiaController.pesquisa);
routes.post("/estrategia/layPrimeiroTempo", EstrategiaController.layPrimeiroTempo);

module.exports = routes;