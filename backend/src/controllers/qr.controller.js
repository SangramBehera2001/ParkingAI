const qrService = require('../services/qr.service');

const generateQR = async (req, res, next) => {
  try {

    const { token } = req.params;

    const qr = await qrService.generateQRCode(token);

    res.json({
      success: true,
      data: qr
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateQR
};