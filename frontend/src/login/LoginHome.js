import { useEffect, useState } from 'react';
import Login from './Login';
import './LoginHome.css';
import Plateforms from './Plateforms';
import Otp from './Otp';
import Goal from './Goal';
import { useLocation, useParams } from 'react-router-dom';
import SetPassword from './SetPassword';
import LoginEmailPass from './LoginEmailPass';
import ForgotPass from './ForgotPass';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoginHome = () => {
    const {state} = useLocation();
    const { token } = useParams()
    const [verfiedEmail, setVerifiedEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [otp, setOtp] = useState("")
    const [form, setForm] = useState('login') 

    //const clientId = '317526058530-vvp02ic7p94m4pfljico1i8cj6rubh25.apps.googleusercontent.com'
    //const clientSecret = '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'
    const redirectUri = 'http://localhost:3000/callback'
    const code = new URLSearchParams(window.location.search).get('code');

    const clientId = '991105793073-1dikvgcrhdiqahsm2056906unah9tpnb.apps.googleusercontent.com'
    const clientSecret = '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'


    useEffect( () => {
        if (state) {
            if (state.email != null && state.email !== '') {
                console.log('1');
                setVerifiedEmail(state.email);
            }
            if (state.mobile != null && state.mobile !== '') {
                console.log('2');
                setMobile(state.mobile);
            }
            if (state.otp != null && state.otp !== '') {
                console.log('3');
                setOtp(state.otp);
            }
            if (state.route != null && state.route !== '') {
                console.log('4');
                setForm(state.route);
            }
        }
    }, [state])

    useEffect( () => {
        if (code) {
            handleCallback()
        }
    })

    const handleCallback = async () => {
        console.log('handleCallback')
        //const code = new URLSearchParams(window.location.search).get('code');
        console.log(code)
        try {
            const tokenResponse = await axios.post(
                'https://oauth2.googleapis.com/token',
                {
                  code,
                  client_id: clientId,
                  client_secret: clientSecret,
                  redirect_uri: redirectUri,
                  grant_type: 'authorization_code',
                }
              );
          
              const accessToken = tokenResponse.data.access_token;
            //   console.log('accessToken')
            //   console.log(accessToken)
              // Now you can use the accessToken to make authorized API requests.
      
               // ... Use the accessToken to make API requests ...
      
              const emailResponse = await axios.get(
                  'https://www.googleapis.com/gmail/v1/users/me/profile',
                  {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  },
                  }
              );
        
              //setUserEmail(emailResponse.data.emailAddress);
              console.log('emailAddress')
              console.log(emailResponse.data.emailAddress)
        } catch (e) {
            console.log('error')
            console.log('e ' + e)
        }
    };
    
    const fetchDetailsFromToken = async (token) => {
        try {
            let data = {"token": token};
            let url = 'http://localhost:5000/token-details';
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
                    const studentDetails = jsonData[0];
                    let email_id = studentDetails.email_id;
                    setVerifiedEmail(email_id)
                    //sent email to set password
                } else {
                    //no data match with token
                }
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    useEffect( () => {
        // console.log("token " + token);
        if (token !== '' && token !== undefined) {
            fetchDetailsFromToken(token)
            //formval = "setpassword"
            setForm('setpassword')
        }
    }, [token]) 

    const setFormNavigate = (text, mobile, email, otp) => {
        console.log('setFormNavigate ' + text + ' mobile ' + mobile + ' email ' + email + ' otp ' + otp)
        if (mobile !== undefined && mobile !== "") {
            setMobile(mobile)
        }
        if (email !== undefined && email !== "") {
            setVerifiedEmail(email)
        }
        if (otp !== undefined && otp !== "") {
            setOtp(otp)
        }
        setForm(text)
    }

    return (
        <Container fluid>
            <Row>
                <div className='div-login'>
                    <span className='span-login-register' onClick={() => setFormNavigate('loginemailpass')}>Login/register</span>
                </div>
            </Row>
            <Row>
                <Col xs={12} lg={6}>  
                    <Plateforms />
                </Col>
                <Col xs={12} lg={6} >   
                    {
                    form === "login" ? 
                                <Login form={setFormNavigate}/>
                    : form === "otp" ?  
                                <Otp mobile={mobile} otp={otp} email={verfiedEmail} form={setFormNavigate} /> 
                    : form === "goal" ? 
                                <Goal email={verfiedEmail} mobile={mobile} form={setFormNavigate}/> 
                    : form === "setpassword" ? 
                                <SetPassword email={verfiedEmail} form={setFormNavigate}/> 
                    : form === "loginemailpass" ?  
                                <LoginEmailPass email={verfiedEmail} form={setFormNavigate}/> 
                    : form === "forgotpass" ?  
                                <ForgotPass form={setFormNavigate}/> 
                    : <span>No UI</span>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default LoginHome;