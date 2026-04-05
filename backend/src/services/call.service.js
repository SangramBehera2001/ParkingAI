const axios = require('axios');

const makeCall = async (toNumber) => {
    try {
        const url = `https://${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}@api.exotel.com/v1/Accounts/${process.env.EXOTEL_SID}/Calls/connect.json`;

        const response = await axios.post(url, {
            From: process.env.EXOTEL_CALLER_ID, // proxy number
            To: toNumber, // vehicle owner
            CallerId: process.env.EXOTEL_CALLER_ID
        });

        return response.data;

    } catch (error) {
        console.error(error.response?.data || error.message);
        throw new Error('Call failed');
    }
};

module.exports = {
    makeCall
};