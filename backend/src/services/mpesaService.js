// backend/src/services/mpesaService.js

const axios = require('axios');

/**
 * Generate M-Pesa access token
 */
exports.getAccessToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );

    return response.data.access_token;
  } catch (err) {
    console.error('Error generating M-Pesa token:', err.message);
    throw new Error('Failed to generate M-Pesa token');
  }
};

/**
 * Initiate STK Push Payment
 */
exports.initiatePayment = async (phoneNumber, amount, accountReference, description) => {
  try {
    const token = await this.getAccessToken();

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: process.env.MPESA_PASSWORD, // generated from shortcode + passkey + timestamp
      Timestamp: new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14),
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: description || 'Legal Service Payment',
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err) {
    console.error('M-Pesa payment error:', err.message);
    throw new Error('Payment initiation failed');
  }
};
