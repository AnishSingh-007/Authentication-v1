import { useState, useEffect } from 'react'
import gmailIcon from '../assests/gmail.png'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Login = (props) => {
    const navigate = useNavigate()
    const [mobileNo, setMobileNo] = useState("")
    const [enableOtp, setEnableOtp] = useState(false);
    const [emailId, setEmailId] = useState("")
    const [enableEmailId, setEnableEmailId] = useState(false);
    
    //const clientId = '317526058530-vvp02ic7p94m4pfljico1i8cj6rubh25.apps.googleusercontent.com'
    //const clientSecret = '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'
    const redirectUri = 'http://localhost:3000/callback'

    const clientId = '991105793073-1dikvgcrhdiqahsm2056906unah9tpnb.apps.googleusercontent.com'
    const clientSecret = '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'

    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const loginGmail = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // console.log(tokenResponse)
            //const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => {
                console.log("res.data")
                console.log(res.data)
                console.log("res.data.name " + res.data.name)
                console.log("res.data.email " + res.data.email)
                fetchGmailApi(res.data.email, res.data.name)
            });
            //console.log("userInfo")
            //console.log(userInfo);
        },
        //flow: 'auth-code'
    });

    const fetchGmailApi = async (email, name) => {
        try {
            let data = {"email": email, 'name': name};
            let url = 'http://localhost:5000/login-gmail';
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
                if (jsonData.status == 'success') {
                    navigate("/home", {state: {modelType: "", mobile: "", email: ""}})
                } else {
                    alert('somthing went wrong. try again later')
                }
                //sent user to home page
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    const gmailLogin = () => {
        console.log('gmailLogin')
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly`
        window.location.href = authUrl;
    }

    const getOtp = () => {
        if (enableOtp) {
            console.log('getOtp clicked') 
            fetchMobileApi()
        }
    }

    const fetchMobileApi = async () => {
        try {
            let data = {"mobile_number": mobileNo};
            let url = 'http://localhost:5000/login-with-mobile';
            console.log(url);
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
                console.log('OTP:', jsonData.otp);
                props.form('otp', mobileNo, "", jsonData.otp)
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    const handleChangeNumber = (e) => {
        setMobileNo(e.target.value.slice(0, 10));
        if (e.target.value.length >= 10) {
            setEnableOtp(true)
        } else {
            setEnableOtp(false)
        }
    }

    const handleChangeEmail = (e) => {
        setEmailId(e.target.value);
        if (isEmail(e.target.value)) {
            setEnableEmailId(true)
        } else {
            setEnableEmailId(false)
        }
    }

    const emailSubmit = () => { 
        if (enableEmailId) {
            //check if email exists in our databse
            //navigate("/home")
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
                    console.log('sent user to login page')
                    //naviagete login page
                    props.form('loginemailpass', '', emailId, '')
                } else {
                    console.log('sent email to user')
                    sentEmailToUser();
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
        // <Container fluid>
        <div className='main-div-login'>  
            
            <span className='get-started-span-login'>Get started with Pinnacle</span><br/><br/><br/>
            
            
            <span className='please-span'>Please enter your mobile number to login/ register</span><br/><br/>
            
            {/* <Row> */}
            <div className='mobile-div'>
                {/* <Col lg={2}> */}
                <span className='code-span'>+91</span>
                {/* </Col> */}
                {/* <Col lg={6}> */}
                <input 
                    id='input-mobile-number' 
                    className='number-input' 
                    type="number" 
                    value={mobileNo} 
                    onChange={ handleChangeNumber } 
                    placeholder="enter your 10 digit mobile number" />
                {/* </Col> */}
                {/* <Col lg={4}> */}
                <button 
                    className={"button-login-get-otp-" + (enableOtp ? "enable" : "disable")} 
                    type="submit" 
                    onClick={getOtp}>Get OTP</button> 
                {/* </Col> */}
            </div><br/><br/><br/>
            {/* </Row> */}
            
            <span className='please-span'>or login / register with email ID</span><br/><br/>
            
            {/* <Row> */}
            <div className='mobile-div'>
                <input 
                    className='number-input' 
                    type="text" 
                    value={emailId} 
                    onChange={ handleChangeEmail } 
                    placeholder="enter your email id"/>
                    
                <button 
                    className={'button-login-submit-' + (enableEmailId ? 'enable' : 'disable')} 
                    onClick={emailSubmit}
                    type="submit">Submit</button>
            </div><br/><br/><br/>
            {/* </Row> */}
            
            <span className='please-span'>or login with gmail</span><br/><br/>
            
            
            <img onClick={() => loginGmail()} class='img-login-gmail' src={gmailIcon} alt="gmail"/> 
            
        </div>
        // </Container>
    );
}

export default Login;