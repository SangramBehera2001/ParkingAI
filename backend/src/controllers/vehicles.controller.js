const vehicleService = require('../services/vehicles.service');
const { decrypt } = require('../utils/encryption');
const { maskPhone, maskEmail } = require('../utils/mask');


// ✅ CREATE VEHICLE
const createVehicle = async (req, res, next) => {
  try {
    const { vehicleNumber, userId } = req.body;

    if (!vehicleNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: 'vehicleNumber and userId are required'
      });
    }

    const vehicle = await vehicleService.createVehicle({ vehicleNumber, userId });

    res.status(201).json({
      success: true,
      data: vehicle
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET ALL VEHICLES
const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    res.json({
      success: true,
      data: vehicles
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET VEHICLE BY ID (FIXED)
const getVehicleById = async (req, res, next) => {
  try {
    const vehicleId = req.params.id;

    const vehicle = await vehicleService.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    res.json({
      success: true,
      data: vehicle
    });

  } catch (error) {
    next(error);
  }
};


// 🔥 SCAN VEHICLE (FINAL VERSION)
const scanVehicle = async (req, res, next) => {
  try {
    const { vehicleNumber } = req.params;

    const vehicle = await vehicleService.getVehicleByNumber(vehicleNumber);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    const user = vehicle.user;

    // 🔓 Decrypt
    const name = user?.name ? decrypt(user.name) : null;
    const email = user?.email ? decrypt(user.email) : null;
    const phone = user?.phone ? decrypt(user.phone) : null;

    // 🔒 Mask
    res.json({
      success: true,
      data: {
        vehicleNumber: vehicle.vehicleNumber,
        ownerName: name,
        email: maskEmail(email),
        phone: maskPhone(phone),
        message: "Scan successful. You can contact the vehicle owner securely."
      }
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  scanVehicle // ✅ FIXED
};