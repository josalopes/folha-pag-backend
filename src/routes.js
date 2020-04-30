const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const TabInssController = require('./controllers/TabInssController');
const CalculoInssController = require('./controllers/CalculoInssController');

const TabIrrfController = require('./controllers/TabIrrfController');
const CalculoIrrfController = require('./controllers/CalculoIrrfController');
const routes = express.Router();

routes.get('/inss', TabInssController.index);
routes.post('/inss', TabInssController.create);
routes.delete('/inss/:id', TabInssController.delete);
routes.get('/inss/calcular', CalculoInssController.calcular);

routes.get('/irrf', TabIrrfController.index);
routes.post('/irrf', TabIrrfController.create);
routes.delete('/irrf/:id', TabIrrfController.delete);
routes.get('/irrf/calcular', CalculoIrrfController.calcular);
//routes.get('/irrf/calculo/:valorBase', CalculoIrrfController.calcular);

module.exports = routes;