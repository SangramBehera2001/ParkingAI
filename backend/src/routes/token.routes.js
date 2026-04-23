const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token.controller');

router.post('/', tokenController.createToken);

module.exports = router;