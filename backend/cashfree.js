const axios = require('axios');

// Set your Cashfree API credentials


// Define the payment data
const paymentData = {
  appId: process.env.CASHFREE_APP_ID,
  orderId: 'your_order_id', // Replace with your order ID
  orderAmount: '100', // Replace with your order amount
  orderCurrency: 'INR', // Replace with your currency
  orderNote: 'Sample order',
  customerName: 'John Doe',
  customerPhone: '1234567890',
  customerEmail: 'john.doe@example.com',
  returnUrl: 'https://example.com/payment/success', // Replace with your success URL
  notifyUrl: 'https://example.com/payment/notify', // Replace with your notify URL
};

// Calculate the signature
const timestamp = Date.now();
const data = `${process.env.CASHFREE_APP_ID}${paymentData.orderId}${paymentData.orderAmount}${paymentData.orderCurrency}${timestamp}`;
const signature = require('crypto').createHmac('sha256', process.env.CASHFREE_SECRET_KEY).update(data).digest('hex');
               
// Send a POST request to initiate the payment
axios
  .post('https://api.cashfree.com/api/v1/order/create', paymentData, {
    headers: {
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      'x-client-timestamp': timestamp,
      'x-client-signature': signature,
    },
  })
  .then((response) => {
    console.log('Payment initiation successful:', response.data);
  })
  .catch((error) => {
    console.error('Payment initiation failed:', error.response.data);
  });
