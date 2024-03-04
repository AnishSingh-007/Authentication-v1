// src/components/PaymentButton.js
import React from 'react';
import axios from 'axios';

function PaymentButton() {
  const initiatePayment = () => {
    // Replace with your server URL
    console.log('50 line p aa gaya')
    axios.post('http://localhost:5000/api/payment/initiate')
      .then((response) => {
        // Handle the response, e.g., redirect to Cashfree payment gateway
       // window.location.href = response.data.paymentUrl;
      })
      .catch((error) => {
        // Handle errors
        console.error('Payment initiation failed:', error);
      });
  };

  return (
    <button onClick={initiatePayment}>Initiate Payment</button>
  );
}

export default PaymentButton;
