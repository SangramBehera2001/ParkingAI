const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles.controller');

// add a GET route so you can look up a vehicle:
router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);         // list all
router.get('/:id', vehicleController.getVehicleById);     // get one by ID

router.post('/', vehicleController.createVehicle);

module.exports = router;