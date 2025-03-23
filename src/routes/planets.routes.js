const express = require('express');
const router = express.Router();
const { getAllPlanets, getPlanetById } = require('../controllers/planets.controller');
const apiKeyAuth = require('../middleware/api.key.auth');

router.use(apiKeyAuth);

router.get('/', getAllPlanets);
router.get('/:id', getPlanetById);

module.exports = router;
