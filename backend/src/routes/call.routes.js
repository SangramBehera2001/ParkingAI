// 🔹 Created by Dibyaranjan Swain
// Purpose: Expose webhook endpoint for Exotel

const express = require('express');
const router = express.Router();

const { exotelWebhook } = require('../controllers/call.controller');

router.post('/exotel', exotelWebhook);

module.exports = router;