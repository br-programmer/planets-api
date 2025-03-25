const express = require('express');
const { imageProxyController } = require('../controllers/image.proxy.controller');
const router = express.Router();

router.get('/image-proxy', imageProxyController);

module.exports = router;
