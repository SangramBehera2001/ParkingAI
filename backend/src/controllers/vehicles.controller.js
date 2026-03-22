// const vehicleService = require('../services/vehicles.service');
// vehicles.routes.js — change this line:
// const vehicleController = require('../controllers/vehicle.controller'); 

// const createVehicle = async (req, res, next) => {
//   try {
//     const vehicle = await vehicleService.createVehicle(req.body);

//     res.status(201).json({
//       success: true,
//       data: vehicle
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createVehicle
// };

// vehicles.controller.js
const vehicleService = require('../services/vehicles.service');

const createVehicle = async (req, res, next) => {
  try {
    const { vehicleNumber, userId } = req.body;

    // Validate input before sending to DB
    if (!vehicleNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: 'vehicleNumber and userId are required'
      });
    }

    const vehicle = await vehicleService.createVehicle({ vehicleNumber, userId });
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json({ success: true, data: vehicles });
  } catch (error) {
    next(error);
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.getVehicleById(parseInt(req.params.id));
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    res.json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

module.exports = { createVehicle, getAllVehicles, getVehicleById };