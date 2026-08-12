const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.post('/', requireAuth, tokenController.createToken);

module.exports = router;
