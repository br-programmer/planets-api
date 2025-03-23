/**
 * @swagger
 * tags:
 *   name: API Keys
 *   description: Endpoints for managing API keys
 */

/**
 * @swagger
 * /api-key/generate:
 *   post:
 *     summary: Generate a new API key
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Key Name
 *     responses:
 *       201:
 *         description: API key created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *       400:
 *         description: Missing key name or invalid user in token
 */

/**
 * @swagger
 * /api-key/list:
 *   get:
 *     summary: List all API keys for the authenticated user
 *     tags: [API Keys]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of API keys
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 keys:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                       name:
 *                         type: string
 *                       owner:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid user in token
 */

const express = require('express');
const router = express.Router();
const { generateApiKey, listApiKeys } = require('../controllers/api.key.controller');
const authToken = require('../middleware/auth.token');

router.use(authToken);
router.post('/generate', generateApiKey);
router.get('/list', listApiKeys);

module.exports = router;
