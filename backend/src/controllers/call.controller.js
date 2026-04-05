// 🔹 Created by Dibyaranjan Swain (Improved Version)

const prisma = require('../prisma/client');

const exotelWebhook = async (req, res) => {
  try {
    const { From, To } = req.body;

    // 🔥 Step 1: Find token using proxy number
    const token = await prisma.token.findFirst({
      where: {
        proxyNumber: To, // ✅ direct match
        isActive: true
      },
      include: {
        vehicle: {
          include: {
            user: true
          }
        }
      }
    });

    if (!token) {
      return res.send(`
        <Response>
          <Say>Invalid or inactive number</Say>
        </Response>
      `);
    }

    const realNumber = token.vehicle.user.phone;

    // ✅ Ensure proper format
    const formattedNumber = realNumber.startsWith('+91')
      ? realNumber
      : `+91${realNumber}`;

    // 🔥 Step 2: Save call log
    await prisma.callLog.create({
      data: {
        caller: From,
        receiver: formattedNumber,
        proxyNumber: To,
        tokenId: token.id
      }
    });

    // 🔥 Step 3: Connect call
    return res.send(`
      <Response>
        <Dial>${formattedNumber}</Dial>
      </Response>
    `);

  } catch (error) {
    console.error("Call routing error:", error);

    return res.send(`
      <Response>
        <Say>System error</Say>
      </Response>
    `);
  }
};

module.exports = {
  exotelWebhook
};