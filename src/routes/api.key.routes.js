const express = require('express');
const router = express.Router();
const { generateApiKey } = require('../controllers/api.key.controller');

router.post('/', generateApiKey);

module.exports = router;
