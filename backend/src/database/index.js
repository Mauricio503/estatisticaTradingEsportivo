const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Entrada = require('../models/Entrada');

const connection = new Sequelize(dbConfig);

Entrada.init(connection);

module.exports = connection;