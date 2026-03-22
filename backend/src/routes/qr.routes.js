const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qr.controller');

router.get('/:token', qrController.generateQR);

module.exports = router;