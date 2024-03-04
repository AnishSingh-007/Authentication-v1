import React, { useEffect, useState } from 'react';
import './ProductInfo.css';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import { load } from "@cashfreepayments/cashfree-js";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { load } from "@cashfreepayments/cashfree-js";

const ProductInfo = ({ selectedExams, selectedCategories, selectedModes }) => {

  const [testPassData, setTestPassData] = useState([]);
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(20);

  console.log("sliderValue" + sliderValue)            

  // Step 3: Define function for onChange event    
  const handleSliderChange = (event, newValue) => {
    // Update state when slider value changes
    setSliderValue(newValue);               
  };
  
  const marks = [
    {
      value: 90,
    },
    {
      value: 180,
    },
    {
      value: 365,
    },
  ];

  function valuetext(value) {
    console.log("valuetext" + value)
    return `${value}°C`;
  }

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
          redirectTarget: "_self",
      };
      console.log(checkoutOptions)
      cashfree.checkout(checkoutOptions);
  };

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
    console.log('Response order Amount:', response.orderamount);

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

  useEffect(()=> {
    
    const fetchTestPassData = async () => {
      try {
        const postData = {
          selectExam: selectedExams,
          selectedCategorie: selectedCategories,
          selectedMode: selectedModes,
        };

        console.log(postData) 

        const response = await axios.post('http://localhost:5000/testpass', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setTestPassData(response.data);    
      } catch (error) {
        console.error('Error fetching test pass data:', error);
      }
    };   

    fetchTestPassData();
  
  },[selectedExams, selectedCategories, selectedModes])

  const generateBreadcrumb = () => {   
    let breadcrumb = 'Home';
    console.log(selectedExams)
         
    const selectedItems = [];

    if (selectedExams && selectedExams.length > 0) {
      selectedItems.push(...selectedExams);
    }

    // if (selectedCategories && selectedCategories.length > 0) {
    //   selectedItems.push(...selectedCategories);
    // }

    breadcrumb += selectedItems.length > 0 ? ' > ' + selectedItems.join(', ') : '';

    return breadcrumb;
  };  
   
  /* useEffect(() => {
    // Define an async function to fetch test pass data
    const fetchTestPassData = async () => {
      try {
          
        const postData = {        
          selectCategories: selectedCategories,
        }

        // Make the API request to add the product
        const response = await axios.post('http://localhost:5000/testpasscategory', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Set the fetched data in the state
        setTestPassData(response.data);
      } catch (error) {
        console.error('Error fetching test pass data:', error);
      }
    };

    // Call the fetchTestPassData function when the component mounts
    fetchTestPassData();
  }, []); */ 

  // const testlist = () => {
  //   navigate('/checkout');
  // }

  return (
    <div className="product-info">
      <p className="breadcrumb">{generateBreadcrumb()}</p>
      {/* Conditionally render different content based on selectedExams and selectedCategories */}
      {selectedExams && selectedCategories && (
        <div className="ssc-content railway-content">
          {/* Content for SSC and Railway exams */}
          <h2>{selectedExams == '' ? 'All' : selectedExams.join(' and ')} Exams Content</h2>
          <p>This is content for {selectedExams == '' ? 'All' : selectedExams.join(' and ')} exams.</p>
          {/* Add your content here */}
        </div>   
      )}

      {selectedExams && selectedExams.includes('SSC') && (
        <div className="ssc-content">
          {/* Content for SSC */}
          {/* ... previous SSC content */}
        </div>
      )}

      {selectedExams && selectedExams.includes('Railway') && (
        <div className="railway-content">
          {/* Content for Railway */}
          {/* ... previous Railway content */}
        </div>
      )}
        
      {testPassData.map((testPass) => (  
        <div className="testseries-testpass-div" style={{cursor : 'pointer', float : 'left', marginRight : '50px' }} key={testPass._id}>
          <h4>{testPass.name}</h4>
          <p>Exam: {testPass.exam}</p>
          <p>Price: {sliderValue}</p>
          <p>Expire Period: {sliderValue} days</p>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Custom marks"
              defaultValue={20}
              value={sliderValue} // Pass state variable as value
              onChange={handleSliderChange} // Pass onChange function
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Box>
          <button className='testseries-buy-button' onClick={payMe}>Buy Now</button>
        </div>   
      ))}

      {/* Add more conditions for other exams or categories as needed */}
    </div>
  );
};

export default ProductInfo;
