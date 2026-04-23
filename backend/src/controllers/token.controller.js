  const tokenService = require('../services/token.service');

  const createToken = async (req, res, next) => {
    try {
      const { vehicleId } = req.body;

      if (!vehicleId) {
        return res.status(400).json({
          success: false,
          message: 'vehicleId is required'
        });
      }

      const result = await tokenService.createToken(vehicleId);

      res.status(201).json({
        success: true,
        message: 'Token and QR code generated successfully',
        data: result
      });

    //   res.status(201).json({
    //   success: true,
    //   data: {
    //   id: token.id,
    //   publicToken: token.publicToken
    //   // ❌ DO NOT SEND privateToken
    // }
    // });

    } catch (error) {
      next(error);
    }
  };

  module.exports = { createToken };