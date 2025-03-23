const express = require('express');
const router = express.Router();
const { generateApiKey, listApiKeys } = require('../controllers/api.key.controller');
const authToken = require('../middleware/auth.token');

router.use(authToken);
router.post('/generate', generateApiKey);
router.get('/list', listApiKeys);

module.exports = router;
