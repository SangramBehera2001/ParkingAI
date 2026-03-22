// services/qr.service.js

const QRCode = require('qrcode');

const generateQRCode = async (token) => {

  // This is the URL that gets encoded INSIDE the QR code
  // When someone scans → their phone opens this URL
  const scanUrl = `http://localhost:3000/scan/${token}`;

  // toDataURL returns a base64 string like:
  // "data:image/png;base64,iVBORw0KGgo..."
  // This can be put directly into an <img> tag in HTML
  const qrImage = await QRCode.toDataURL(scanUrl, {
    width: 300,           // QR image size in pixels
    margin: 2,            // white border around QR
    color: {
      dark: '#000000',    // QR dots color
      light: '#FFFFFF'    // background color
    }
  });

  return {
    scanUrl,      // the URL encoded inside the QR
    qrImage       // base64 image string
  };
};

module.exports = {
  generateQRCode
};