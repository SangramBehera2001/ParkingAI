const vehicleService = require('../services/vehicles.service');

const parseVehicleId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const createVehicle = async (req, res, next) => {
  try {
    const { vehicleNumber } = req.body;
    if (!vehicleNumber?.trim()) {
      return res.status(400).json({ success: false, message: 'vehicleNumber is required' });
    }

    const vehicle = await vehicleService.createVehicle(
      vehicleNumber.trim().toUpperCase(),
      req.user.id
    );
    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles(req.user.id);
    res.json({ success: true, data: vehicles });
  } catch (error) {
    next(error);
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const id = parseVehicleId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });

    const vehicle = await vehicleService.getVehicleById(id, req.user.id);
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    res.json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const id = parseVehicleId(req.params.id);
    const { vehicleNumber } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });
    if (!vehicleNumber?.trim()) {
      return res.status(400).json({ success: false, message: 'vehicleNumber is required' });
    }

    const vehicle = await vehicleService.updateVehicle(
      id,
      req.user.id,
      vehicleNumber.trim().toUpperCase()
    );
    if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    res.json({ success: true, data: vehicle });
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const id = parseVehicleId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: 'Invalid vehicle ID' });

    const deleted = await vehicleService.deleteVehicle(id, req.user.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Vehicle not found' });
    res.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
};
