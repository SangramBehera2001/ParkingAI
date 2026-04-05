<<<<<<< Updated upstream
=======
// // const express = require('express');
// // const router = express.Router();
// // const tokenService = require('../services/token.service');

// // router.get('/:token', async (req, res, next) => {
// //   try {
// //     const { token } = req.params;

// //     // Look up the token in DB
// //     const tokenRecord = await tokenService.getTokenByPublicToken(token);

// //     // If token doesn't exist or is deactivated
// //     if (!tokenRecord || !tokenRecord.isActive) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Invalid or expired QR code'
// //       });
// //     }

// //     const owner = tokenRecord.vehicle.user;
// //     const vehicle = tokenRecord.vehicle;

// //     // Mask the phone number — show only last 5 digits
// //     // Example: 9876543210 → XXXXX43210
// //     const maskedPhone = owner.phone.replace(
// //       owner.phone.substring(0, 5),
// //       'XXXXX'
// //     );

// //     // Return safe info — no real phone number exposed
// //     res.json({
// //       success: true,
// //       data: {
// //         vehicleNumber: vehicle.vehicleNumber,
// //         ownerName: owner.name,
// //         maskedPhone,
// //         message: 'Scan successful. You can contact the vehicle owner.'
// //       }
// //     });

// //   } catch (error) {
// //     next(error);
// //   }
// // });

// // module.exports = router;





>>>>>>> Stashed changes
// const express = require('express');
// const router = express.Router();
// const tokenService = require('../services/token.service');

// router.get('/:token', async (req, res, next) => {
//   try {
//     const { token } = req.params;

<<<<<<< Updated upstream
//     // Look up the token in DB
//     const tokenRecord = await tokenService.getTokenByPublicToken(token);

//     // If token doesn't exist or is deactivated
=======
//     // 🔍 Fetch token with relations
//     const tokenRecord = await tokenService.getTokenByPublicToken(token);

//     // ❌ Invalid or inactive token
>>>>>>> Stashed changes
//     if (!tokenRecord || !tokenRecord.isActive) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invalid or expired QR code'
//       });
//     }

<<<<<<< Updated upstream
//     const owner = tokenRecord.vehicle.user;
//     const vehicle = tokenRecord.vehicle;

//     // Mask the phone number — show only last 5 digits
//     // Example: 9876543210 → XXXXX43210
//     const maskedPhone = owner.phone.replace(
//       owner.phone.substring(0, 5),
//       'XXXXX'
//     );

//     // Return safe info — no real phone number exposed
=======
//     const vehicle = tokenRecord.vehicle;
//     const owner = vehicle?.user;

//     // ❌ Safety check (important)
//     if (!vehicle || !owner) {
//       return res.status(404).json({
//         success: false,
//         message: 'Vehicle or owner not found'
//       });
//     }

//     // 🔐 Better phone masking (show last 4 digits only)
//     const maskPhone = (phone) => {
//       return phone.replace(/.(?=.{4})/g, '*');
//     };

//     const maskedPhone = maskPhone(owner.phone);

//     // ✅ Response (safe data only)
>>>>>>> Stashed changes
//     res.json({
//       success: true,
//       data: {
//         vehicleNumber: vehicle.vehicleNumber,
//         ownerName: owner.name,
//         maskedPhone,
//         message: 'Scan successful. You can contact the vehicle owner.'
//       }
//     });

//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;



<<<<<<< Updated upstream


const express = require('express');
const router = express.Router();
const tokenService = require('../services/token.service');

router.get('/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    // 🔍 Fetch token with relations
    const tokenRecord = await tokenService.getTokenByPublicToken(token);

    // ❌ Invalid or inactive token
    if (!tokenRecord || !tokenRecord.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired QR code'
      });
    }

    const vehicle = tokenRecord.vehicle;
    const owner = vehicle?.user;

    // ❌ Safety check (important)
    if (!vehicle || !owner) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle or owner not found'
      });
    }

    // 🔐 Better phone masking (show last 4 digits only)
    const maskPhone = (phone) => {
      return phone.replace(/.(?=.{4})/g, '*');
    };

    const maskedPhone = maskPhone(owner.phone);

    // ✅ Response (safe data only)
    res.json({
      success: true,
      data: {
        vehicleNumber: vehicle.vehicleNumber,
        ownerName: owner.name,
        maskedPhone,
        message: 'Scan successful. You can contact the vehicle owner.'
      }
    });

  } catch (error) {
    next(error);
  }
});
=======
// 🔹 Modified by Dibyaranjan Swain
// Purpose:
//   - Define scan API route
//   - Delegate logic to controller
//   - Remove old masking/token-based direct handling

const express = require('express');
const router = express.Router();

const scanController = require('../controllers/scan.controller');


// 🔷 GET /scan/:token
// 🔹 Description:
//   - Handles QR scan requests
//   - Calls controller → service → DB
//   - Returns vehicle + proxy number

router.get('/:token', scanController.scanQR);

>>>>>>> Stashed changes

module.exports = router;