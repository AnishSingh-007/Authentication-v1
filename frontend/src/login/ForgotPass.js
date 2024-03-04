import './ForgotPass.css'
import gmailIcon from '../assests/gmail.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPass = (props) => {
    const navigate = useNavigate()
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMsg, setEmailErrorMsg] = useState('')
    const [btnEnable, setBtnEnable] = useState(false)
    const [emailId, setEmailId] = useState('')

    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

    const handleChangeEmail = (e) => {
        setEmailId(e.target.value);
        if (isEmail(e.target.value)) {
            setBtnEnable(true)
        } else {
            setBtnEnable(false)
        }
        setEmailError(false)
        setEmailErrorMsg('')
    }

    const resetPassword = () => {
        console.log('resetPassword')
        if (btnEnable) {
            fetchEmailApi()
        }
    }

    const fetchEmailApi = async () => {
        try {
            let data = {"email_id": emailId};
            let url = 'http://localhost:5000/login-with-email';
            console.log(url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            console.log('Response Status:', response.status);
    
            if (response.ok) { 
                const jsonData = await response.json();
                console.log('JSON Data:', jsonData);
                if (jsonData.length > 0) {
                    setEmailError(false)
                    setEmailErrorMsg('')
                    sentEmailToUser()
                } else {
                    //show error message
                    setEmailError(true)
                    setEmailErrorMsg('Enail id not found')
                }
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
        
    }

    const sentEmailToUser = async () => {
        console.log('sentEmailToUser')
        try {
            let data = {"email_id": emailId};
            let url = 'http://localhost:5000/send-email';
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
                const jsonData = await response.json();
                console.log('JSON Data:', jsonData);
                if (jsonData.status === 'success') { 
                    navigate("/home", {state: {modelType: "email-verification", mobile: '', email: emailId}})
                } else {
                    console.log('failed to send email')
                    //failed to sent email
                    setEmailError(true)
                    setEmailErrorMsg('Something went wrong. Try again later.')
                }
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    return (
        <div className='div-fp-email'> 
            <span className='span-fp-get'>Get started with Pinnacle</span>
            
            <label className='label-fp-userid'>Email ID</label>
            <input
                value={emailId} 
                onChange={ handleChangeEmail } 
                placeholder='Registered Email Id' 
                className='input-fp-userid' 
                type='text' />

            { emailError ? <span className='span-fp-error'>{ emailErrorMsg }</span> : '' }
            
            <button
                onClick={resetPassword}
                className={'button-fp-submit-' + (btnEnable ? 'enable' : 'disable')} 
                type='submit' >Submit</button>
            
            <span className='span-fp-or-login'>or login with gmail</span>
            <img className='img-fp-gmail' src={gmailIcon} alt="gmail"/>
        </div>
    );
}

export default ForgotPass;