const scanService = require('../services/scan.service');

const scanQR = async (req, res, next) => {
  try {

    const { token } = req.params;

    const data = await scanService.scanVehicle(token);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  scanQR
};