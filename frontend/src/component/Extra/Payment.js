import axios from 'axios';
import { load } from "@cashfreepayments/cashfree-js";

const Payment = () => {
    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox"
        });
    }
    initializeSDK();

    const doPayment = async (id) => {
        let checkoutOptions = {
            paymentSessionId: id,
            redirectTarget: "_blank",
        };
        console.log(checkoutOptions)
        cashfree.checkout(checkoutOptions);
    };

  //https://sandbox.cashfree.com/pg
  //525548c5802522ef616779d7e45525
  //3bed5dce0a3876c177ff5b1120dbff0a5f535b9a
  //https://api.cashfree.com/pg
  //9796704a1ca4329eacf6ffbfa76979
  //17c28983a6da3a79f12acefc6bac8369e54c09a2


const createOrder = async () => {
  try {
      let data = {"email_id": 'haridattbhatt0@gmail.com'};
      let url = 'http://localhost:5000/payment';
      console.log(url);
      console.log(data);
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      console.log('Response Status:', response.status);

      if (response.ok) { 
        const responseData = await response.json();
          console.log(responseData);
          console.log('JSON Data:' + responseData);
          console.log(responseData.status);
          console.log('JSON Data: status ' + responseData.status);
          console.log(responseData.message);
          console.log('JSON Data: message ' + responseData.message);
          doPayment(responseData.message)
          
      } else {
          console.log('Response Error:');
      }
  } catch (err) {
      console.log('Error fetching data:');
      console.error(err);
  }
  
}

const payMe = () => {
    console.log("payme")
    createOrder()
    
}

    return (
        <div>
            <h1>Payment Testing</h1>
            <button onClick={() => payMe()}>Pay Me</button>
        </div>
    );
}

export default Payment;