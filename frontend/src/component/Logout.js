import React from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate();

    const logoutHandler = async function() {
      try {

        const token = localStorage.getItem("token");
        let data = {"authenticationToken": token};

        let url = 'http://localhost:5000/logout';
        console.log(url);
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const jsonData = await response.json();
            console.log('JSON Data:', jsonData);

            localStorage.removeItem("token");
            localStorage.removeItem("expiration");
            return navigate("/");
        } else {
            console.log('Response Error:', response.statusText);
        }
    } catch (err) {
        console.log('Error fetching data: ' + err);
    }

    }




  return (
    <button type="submit" onClick={logoutHandler}>logout</button>
  )
}

export default Logout