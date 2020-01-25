const{ Router } = require('express');
const EstrategiaController = require("./controller/EstrategiaController");

const routes = Router();

routes.get("/estrategia/teste", EstrategiaController.teste);
routes.post("/estrategia/pesquisa", EstrategiaController.pesquisa);
routes.get("/estrategia/pesquisa", EstrategiaController.pesquisa);

module.exports = routes;