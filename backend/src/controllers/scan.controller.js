// 🔹 Modified by Dibyaranjan Swain
// Purpose:
//   - Handle incoming scan request
//   - Validate token
//   - Call service layer
//   - Return clean API response

const scanService = require('../services/scan.service');


/**
 * 🔷 scanQR Controller
 * 🔹 Description:
 *   Handles QR scan request and returns vehicle details
 *   with proxy number (NOT real phone)
 *
 * 🔹 Flow:
 *   Request → Controller → Service → DB → Response
 */
const scanQR = async (req, res, next) => {
  try {
    const { token } = req.params;

    // 🔹 Validation: token must exist
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required"
      });
    }

    // 🔹 Call service layer
    const data = await scanService.scanVehicle(token);

    // 🔹 Success response
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