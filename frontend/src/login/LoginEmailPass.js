import './LoginEmailPass.css'
import gmailIcon from '../assests/gmail.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginEmailPass = (props) => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(props.email)
    const [pass, setPass] = useState("")
    const [errorEnable, setErrorEnable] = useState(false)
    const [error, setError] = useState("")
    const [userIdPassEmpty, setuserIdPassEmpty] = useState(true);

    const navigationComponent = (text) => {
        props.form(text)
    }

    const gmailLogin = useGoogleLogin({
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

    const submitLogin = () => {
        console.log('submitLogin')
        if (!userIdPassEmpty) {
            fetchLoginApi();
        }
    }

    const fetchLoginApi = async () => {
        try {
            let data = {"userid": userId, "pass": pass};
            let url = 'http://localhost:5000/login-with-email-pass';
            console.log(url)
            console.log(data)
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
                if (jsonData.status == 'failed') {
                    setErrorEnable(true)
                    setError(jsonData.message)
                } else if (jsonData.status == 'success') {
                    console.log(jsonData);
                    const token = jsonData.details.authenticationToken;
                    localStorage.setItem("token", token);
                    const expiration = new Date();
                    expiration.setHours(expiration.getHours() + 24);
                    localStorage.setItem("expiration", expiration.toISOString());


                    navigate("/home", {state: {modelType: "", mobile: "", email: ""}})
                }
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    const handleChangeUserid = (e) => {
        setUserId(e.target.value);
        if (e.target.value.length > 0 && pass.length > 0) {
            setuserIdPassEmpty(false)
        } else {
            setuserIdPassEmpty(true)
        }
        setErrorEnable(false)
    }

    const handleChangePassword = (e) => {
        setPass(e.target.value)
        if (e.target.value.length > 0 && userId.length > 0) {
            setuserIdPassEmpty(false)
        } else {
            setuserIdPassEmpty(true)
        }
        setErrorEnable(false)
    }

    return (
        <div className='div-login-email-pass'>
            <span className='span-lep-get'>Get started with Pinnacle</span>
            <span className='span-lep-login'>Login</span>
            <span onClick={() => navigationComponent("login")} className='span-lep-register'>Register now</span>
            <label className='label-lep-userid'>User ID</label>
            <input
                value={userId}
                placeholder='email id / mobile number'
                onChange={ handleChangeUserid } 
                className='input-lep-userid' 
                type='text' />
            <label className='label-lep-userid'>password</label>
            <input
                value={pass}
                onChange={ handleChangePassword }
                className='input-lep-userid' 
                type='password' />
            {!errorEnable ? '' : <span className='span-lep-userid-error'>{error}</span>}
            <button 
                onClick={() => submitLogin()} 
                className={"button-lep-submit-" + (userIdPassEmpty ? "disable" : "enable")}
                type='submit' >Submit</button>
            <span onClick={() => navigationComponent("forgotpass")} className='span-lep-forgot-pass'>Forgot password</span>
            <span className='span-lep-or-login'>or login with gmail</span>
            <img onClick={() => gmailLogin()} className='img-gmail' src={gmailIcon} alt="gmail"/>
        </div>
    );
}

export default LoginEmailPass;