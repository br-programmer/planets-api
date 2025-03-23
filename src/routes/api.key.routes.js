const express = require('express');
const router = express.Router();
const { generateApiKey, listApiKeys } = require('../controllers/api.key.controller');

router.post('/', generateApiKey);

router.get('/list', listApiKeys);

module.exports = router;
