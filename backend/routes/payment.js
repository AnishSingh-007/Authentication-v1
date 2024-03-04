// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Set your Cashfree API credentials
   
router.post('/initiate', (req, res) => {
  // Define payment data
  const paymentData = {   
    appId: process.env.CASHFREE_APP_ID,
    orderId: '455446556', // Replace with your order ID
    orderAmount: '100', // Replace with your order amount
    orderCurrency: 'INR', // Replace with your currency
    orderNote: 'Sample order',    
    customerName: 'John Doe',
    customerPhone: '1234567890',
    customerEmail: 'john.doe@example.com',
    //returnUrl: 'https://example.com/payment/success', // Replace with your success URL
    //notifyUrl: 'https://example.com/payment/notify', 
    // Include other payment details here 
  };
       
  // Calculate the signature (similar to the previous example)
  // ...

  // Send a POST request to Cashfree to initiate the payment
  axios.post('https://api.cashfree.com/api/v1/order/create', paymentData, {
    headers: {
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      //'x-client-timestamp': timestamp,
      //'x-client-signature': signature,
      // Add other headers as needed
    },
  })
  .then((response) => {
    // Handle the Cashfree response, e.g., return a response to the frontend
    res.json(response.data);
  })
  .catch((error) => {
    // Handle errors and return an error response
    res.status(500).json({ error: 'Payment initiation failed' });
  });
});

module.exports = router;
