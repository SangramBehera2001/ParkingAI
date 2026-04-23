// 🔹 Created by Dibyaranjan Swain
// Purpose: Handle incoming Exotel calls and route to real number securely

// 🔹 Modified by Krishna
// Purpose: Added exotelCallEnd webhook to release proxy number and update call log
// Purpose: Added decryption of real phone number before passing to Exotel

const prisma = require('../prisma/client');
const { decrypt } = require('../utils/encryption'); // 🔹 Added by Krishna


/**
 * 🔷 exotelWebhook
 * 🔹 Description:
 *    Handles incoming Exotel call webhook
 *    Finds real owner number via proxy, logs the call, connects via Exotel XML
 *
 * 🔹 Flow:
 *    Exotel calls proxy → webhook fires → find token → decrypt real number → dial
 */
const exotelWebhook = async (req, res) => {
  try {
    const { From, To } = req.body;

    // 🔥 Step 1: Find token using proxy number
    const token = await prisma.token.findFirst({
      where: {
        proxyNumber: {
          number: To
        },
        isActive: true
      },
      include: {
        user: true,
        proxyNumber: true
      }
    });

    if (!token) {
      return res.send(`
        <Response>
          <Say>Invalid or inactive number</Say>
        </Response>
      `);
    }

    // 🔹 Modified by Krishna
    // Purpose: phone is now encrypted in DB — must decrypt before dialing
    // ❌ Before: const realNumber = token.user.phone;
    const realNumber = decrypt(token.user.phone); // 🔥 Decrypted by Krishna

    // 🔹 Safety check — if decryption fails, don't connect the call
    // 🔹 Added by Krishna
    if (!realNumber) {
      console.error(`Decryption failed for user ID: ${token.user.id}`);
      return res.send(`
        <Response>
          <Say>System error. Please try again later.</Say>
        </Response>
      `);
    }

    // 🔥 Step 2: Save call log
    // 🔹 Added by Dibyaranjan Swain
    await prisma.callLog.create({
      data: {
        caller: From,
        receiver: realNumber,  // 🔹 Storing decrypted number in log (internal use only)
        proxyNumber: To,
        tokenId: token.id
      }
    });

    // 🔥 Step 3: Connect call (Exotel XML response)
    return res.send(`
      <Response>
        <Dial>${realNumber}</Dial>
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


/**
 * 🔷 exotelCallEnd
 * 🔹 Added by Krishna
 * 🔹 Description:
 *    Handles Exotel call-end webhook
 *    Releases proxy number (isBusy = false) so it can be reused
 *    Updates CallLog with duration, status, and end timestamp
 *
 * 🔹 Flow:
 *    Call ends → Exotel fires webhook → release proxy → update log
 */
const exotelCallEnd = async (req, res) => {
  try {

    // 🔹 Added by Krishna
    // Exotel sends these fields when a call ends
    // To           = proxy number that was called
    // CallDuration = duration in seconds
    // Status       = "completed", "no-answer", "failed", "busy" etc.
    const { To, CallDuration, Status } = req.body;

    // 🔹 Added by Krishna
    // Step 1: Find the proxy number record using the virtual number
    const proxy = await prisma.proxyNumber.findUnique({
      where: { number: To }
    });

    if (!proxy) {
      console.warn(`Call-end webhook: proxy number not found for ${To}`);
      return res.status(200).send("OK"); // Always return 200 to Exotel
    }

    // 🔹 Added by Krishna
    // Step 2: Release the proxy number so it can be assigned to new calls
    await prisma.proxyNumber.update({
      where: { id: proxy.id },
      data: { isBusy: false }  // 🔥 Free the proxy number
    });

    // 🔹 Added by Krishna
    // Step 3: Find the most recent CallLog that used this proxy number
    // We match by proxyNumber string and pick the latest unfinished log
    const callLog = await prisma.callLog.findFirst({
      where: {
        proxyNumber: To,
        status: null   // 🔥 Only update logs that haven't been closed yet
      },
      orderBy: {
        createdAt: 'desc'  // Pick the most recent one
      }
    });

    if (callLog) {
      // 🔹 Added by Krishna
      // Step 4: Update the call log with final call details
      await prisma.callLog.update({
        where: { id: callLog.id },
        data: {
          duration: parseInt(CallDuration) || 0,  // 🔥 Save call duration in seconds
          status: Status?.toLowerCase() || 'completed',         // 🔥 Save final call status
          endedAt: new Date()                      // 🔥 Timestamp when call ended
        }
      });
    }

    // 🔹 Added by Krishna
    // Always respond with 200 — Exotel expects this to confirm webhook received
    return res.status(200).send("OK");

  } catch (error) {
    console.error("Call-end webhook error:", error);

    // 🔹 Added by Krishna
    // Still return 200 so Exotel doesn't retry endlessly
    return res.status(200).send("OK");
  }
};


module.exports = {
  exotelWebhook,
  exotelCallEnd   // 🔹 Added by Krishna — export new handler
};