import React, { useState } from 'react'
import { Row, Col }  from 'react-bootstrap'
import './Checkout.css'
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [customerInfo, setCustomerInfo] = useState({});
  const [products, setProducts] = useState([]); // Fetch products from the server
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    navigate('/testseriessingle/1');
     
    /* try {
      const orderData = { customerInfo, products };
      const response = await fetch('http://localhost:5000/checkout', {
        method: 'POST',   
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Handle successful order submission

      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    } */
  };

  return (
    <div>
      <h2>Checkout</h2>
      <Row>
        <Col md={9}>
            <div>
                <Row>
                    <Col md={2}>
                       <img src=""></img>
                    </Col>
                    <Col md={6}>
                       <b>Pinnacle Maths 6500</b>
                       <p>English, paperback, Hindi</p>
                       <p>Seller: <span>Pinnacle</span></p>
                       <p><strike>₹2,995</strike><span>₹107963%</span></p>
                    </Col>        
                    <Col md={4}>
                       <p></p>
                    </Col>
                </Row>
            </div>
        </Col>
        <Col md={3}>
            <span>PRICE DETAILS</span>
            <p><span>Price(1 item)</span><span>₹2,995</span></p>
            <p><span>Discount</span><span>-₹1,916</span></p>
            <p><span>Delivery Charges</span><span>Free</span></p>
            <p><span>Total Amount</span><span>₹1,079</span></p>
        </Col>
      </Row>
      <form>
        {/* Input fields for customer information */}
        {/* Display products for purchase */}
        <button onClick={handleOrderSubmit}>Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
