/**
 * @swagger
 * tags:
 *   name: Planets
 *   description: Endpoints for retrieving planet information
 */

/**
 * @swagger
 * /planets:
 *   get:
 *     summary: Get all planets (basic info)
 *     tags: [Planets]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: A simplified list of planets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: earth
 *                   name:
 *                     type: string
 *                     example: Earth
 *                   highlight:
 *                     type: string
 *                     example: Our home planet
 *                   image:
 *                     type: string
 *                     example: https://cdn.planets.com/earth.png
 *       401:
 *         description: Invalid or missing API key
 *       500:
 *         description: Failed to retrieve planets
 */

/**
 * @swagger
 * /planets/{id}:
 *   get:
 *     summary: Get full details of a specific planet
 *     tags: [Planets]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Planet ID (e.g., earth, mars)
 *         schema:
 *           type: string
 *           example: earth
 *     responses:
 *       200:
 *         description: Detailed information about a planet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: earth
 *                 name:
 *                   type: string
 *                   example: Earth
 *                 highlight:
 *                   type: string
 *                   example: Our home planet
 *                 image:
 *                   type: string
 *                   example: https://cdn.planets.com/earth.png
 *                 gravity:
 *                   type: string
 *                   example: 9.8 m/s²
 *                 diameter:
 *                   type: string
 *                   example: 12,742 km
 *                 atmosphere_composition:
 *                   type: string
 *                   example: 78% Nitrogen, 21% Oxygen
 *                 description:
 *                   type: string
 *                   example: Earth is the third planet from the Sun...
 *       404:
 *         description: Planet not found
 *       401:
 *         description: Invalid or missing API key
 *       500:
 *         description: Failed to retrieve planet
 */

const express = require('express');
const router = express.Router();
const { getAllPlanets, getPlanetById } = require('../controllers/planets.controller');
const apiKeyAuth = require('../middleware/api.key.auth');

router.use(apiKeyAuth);
router.get('/', getAllPlanets);
router.get('/:id', getPlanetById);

module.exports = router;
