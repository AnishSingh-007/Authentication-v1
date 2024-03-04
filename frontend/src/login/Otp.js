import './Otp.css'
import edit from '../assests/edit.png'
import { useEffect, useRef, useState } from 'react';
import CountdownTimer from './CountdownTimer'
import { useNavigate } from 'react-router-dom'
import ReactModal from "react-modal"

const Otp = (props) => {
    const navigate = useNavigate()
    const inputOneRef = useRef(null)
    const inputTwoRef = useRef(null)
    const inputThreeRef = useRef(null)
    const inputFourRef = useRef(null)
    const [otpDigitOne, setOtpDigitOne] = useState("")
    const [otpDigitTwo, setOtpDigitTwo] = useState("")
    const [otpDigitThree, setOtpDigitThree] = useState("")
    const [otpDigitFour, setOtpDigitFour] = useState("")
    const [agreement, setAgreement] = useState(false)
    const [otpEnable, setOtpEnable] = useState(false)
    const [resendOtpTime, setResendOtpTime] = useState(30)
    const [oriOtp, setOriOtp] = useState(props.otp)
    const [mobileNumber, setMobileNumber] = useState(props.mobile)
    const [emailId, setEmailId] = useState(props.email)
    const [termsModel, setTermsModel] = useState(false)
    const [termsModelData, setTermsModelData] = useState('')

    const navigationLogin = (text, mobile, email, otp) => {
        props.form(text, mobile, email, otp)
    }

    useEffect( () => {
        fetchTermsApi()
    })

    const fetchTermsApi = async () => {
        try {
            let url = 'http://localhost:5000/terms-conditions';
            console.log(url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([]),
            });
            if (response.ok) { 
                const jsonData = await response.json();
                console.log('JSON Data:', jsonData);
                if (jsonData.length > 0) {
                    //setTermsModel(true)
                    setTermsModelData(jsonData[0].terms_conditions)
                }
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    const otpSubmitted = () => {
        console.log("Submitted Otp", otpEnable);
        if (otpEnable) {
            //check term and condition check
            if (!agreement) {
                alert('Check terms and conditions.')
            } else {
                let inputOtp = otpDigitOne + '' + otpDigitTwo + '' + otpDigitThree + '' + otpDigitFour 
                console.log('inputOtp ' + inputOtp + ' props.otp ' + oriOtp)
                if (oriOtp == inputOtp) {
                    updateNumberOtp()
                } else {
                    //otp does not match
                    alert('Otp does not match')
                }        
            }
        }
    }

    const updateNumberOtp = async () => {
        if (emailId === undefined || emailId === '') {
            console.log('email is empty update mobile and otp without email')
            try {
                let data = {"mobile_number": mobileNumber, "otp": oriOtp};
                let url = 'http://localhost:5000/update-mobile-otp';
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
                    console.log('ANISH JSON Data:', jsonData);
                    if (jsonData.length > 0) {
                        if (jsonData[0].goal === undefined || jsonData[0].goal.length === 0) {
                            console.log("navigationLogin('goal', mobileNumber, '', oriOtp)")
                            navigationLogin('goal', mobileNumber, '', oriOtp)
                        } else if (jsonData[0].email_id === undefined || jsonData[0].email_id === "") {
                            console.log("navigate(\"/home\", {state: {modelType: \"email\", mobile: mobileNumber, email: ''}})")
                            navigate("/home", {state: {modelType: "email", mobile: mobileNumber, email: ''}})
                        } else if (jsonData[0].mobile_number === undefined || jsonData[0].mobile_number === "") {
                            console.log("jsonData[0].mobile_number === undefined ")
                            navigate("/home", {state: {modelType: "mobile", mobile: "", email: emailId}})
                        } else if (jsonData[0].token_status === undefined || jsonData[0].token_status === "0") {
                            console.log("ANISH CHECK ", jsonData);
                            navigate("/home", {state: {modelType: "email", mobile: mobileNumber, email: jsonData[0].email_id}})
                        } else {

                            console.log("ANISH  ", jsonData);
                            const token = jsonData[0].authenticationToken;
                            localStorage.setItem("token", token);
                            const expiration = new Date();
                            expiration.setHours(expiration.getHours() + 24);
                            localStorage.setItem("expiration", expiration.toISOString());
                  
                            navigate("/home", {state: {modelType: "", mobile: mobileNumber, email: jsonData[0].email_id}})
                        }
                    } else {
                        console.log('something wrong no data')
                    }
                } else {
                    console.log('Response Error:', response.statusText);
                }
            } catch (err) {
                console.log('Error fetching data:');
                console.error(err);
            }
        } else {
            console.log('email is not empty update mobile and otp with email')
            try {
                let data = {email_id: emailId, "mobile_number": mobileNumber, "otp": oriOtp};
                let url = 'http://localhost:5000/update-mobile-otp-email';
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
                    if (jsonData.length > 0) {
                        if (jsonData[0].goal === undefined || jsonData[0].goal.length === 0) {
                            navigationLogin('goal', mobileNumber, '', oriOtp)
                        } else if (jsonData[0].email_id === undefined || jsonData[0].email_id === "") {
                            navigate("/home", {state: {modelType: "email", mobile: mobileNumber, email: ''}})
                        } else if (jsonData[0].mobile_number === undefined || jsonData[0].mobile_number === "") {
                            navigate("/home", {state: {modelType: "mobile", mobile: "", email: emailId}})
                        } else if (jsonData[0].token_status === undefined || jsonData[0].token_status === "0") {
                            navigate("/home", {state: {modelType: "email", mobile: mobileNumber, email: jsonData[0].email_id}})
                        } else {
                            
                            const token = jsonData.token;
                            localStorage.setItem("token", token);
                            const expiration = new Date();
                            expiration.setHours(expiration.getHours() + 24);
                            localStorage.setItem("expiration", expiration.toISOString());
                  
                            navigate("/home", {state: {modelType: "", mobile: mobileNumber, email: jsonData[0].email_id}})
                        }
                    } else {
                        console.log('something wrong no data')
                    }
                } else {
                    console.log('Response Error:', response.statusText);
                }
            } catch (err) {
                console.log('Error fetching data:');
                console.error(err);
            }
        }
        
    }

    const handleChangeOtpOne = (e) => {
        setOtpDigitOne(e.target.value.slice(0, 1));
        if (e.target.value.length > 0) {
            inputTwoRef.current.focus()
        }
        checkOtpEnabled()
    }

    const handleChangeOtpTwo = (e) => {
        setOtpDigitTwo(e.target.value.slice(0, 1));
        if (e.target.value.length > 0) {
            inputThreeRef.current.focus()
        }
        checkOtpEnabled()
    }

    const handleChangeOtpThree = (e) => {
        setOtpDigitThree(e.target.value.slice(0, 1));
        if (e.target.value.length > 0) {
            inputFourRef.current.focus()
        }
        checkOtpEnabled()
    }

    const handleChangeOtpFour = (e) => {
        setOtpDigitFour(e.target.value.slice(0, 1));
        if (e.target.value.length > 0) {
            inputFourRef.current.blur()
        }
        checkOtpEnabled()
    }

    const checkOtpEnabled = () => {
        if (inputOneRef.current.value.length > 0 && inputTwoRef.current.value.length > 0 && inputThreeRef.current.value.length > 0 && inputFourRef.current.value.length > 0) {
            setOtpEnable(true)
        } else {
            setOtpEnable(false)
        }
    }

    const handleChangeAgreement = (e) => {
        setAgreement(e.target.checked)
    }

    const resendOtp = (msg) => {
        console.log('resendOtp ' + msg)
        if (msg === 'mobile') {
            fetchMobileApi()
        } else if (msg === 'whatsapp') {
            //sent otp to whatsapp
            fetchWhatsAppApi();
        }
        
    }

    const fetchWhatsAppApi = async () => {
        try {
            let data = {"mobile_number": mobileNumber};
            let url = 'http://localhost:5000/whatsapp-otp';
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
                setOriOtp(jsonData.otp)
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data: ' + err);
        }
    }

    const fetchMobileApi = async () => {
        try {
            let data = {"mobile_number": mobileNumber};
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
                setOriOtp(jsonData.otp)
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data: ' + err);
        }
    }

    const showTermsCondition = () => {
        setTermsModel(true)
    }

    const closeTermModel = () => {
        setTermsModel(false)
    }
    
    return (
        <div className='main-div-otp'> 
            <span className='get-started-span-otp'>Get started with Pinnacle</span><br/><br/><br/>
            <span className='please-span'>Enter the 4 digit code send to your mobile</span><br/>
            <div className='edit-div'>
                <div className='number-div'>
                    <span className='nineone-span'>(+91) </span>
                    <span className='number-span'>{mobileNumber}</span>
                </div>
                <img className='img-otp-edit' onClick={() => navigationLogin('login')} src={edit} alt="edit"/>
            </div><br/>
            <span className='please-span'>Enter 4 digit OTP</span><br/>
            <div className='otp-div'>
                <input ref={inputOneRef} value={otpDigitOne} onChange={handleChangeOtpOne} className='otp-input' type="number" />
                <input ref={inputTwoRef} value={otpDigitTwo} onChange={handleChangeOtpTwo} className='otp-input' type="number" />
                <input ref={inputThreeRef} value={otpDigitThree} onChange={handleChangeOtpThree} className='otp-input' type="number" />
                <input ref={inputFourRef} value={otpDigitFour} onChange={handleChangeOtpFour} className='otp-input' type="number" />
            </div>
            <div className='check-div'>
                <input className='check-box-otp' type="checkbox" onChange={handleChangeAgreement}/>
                <span onClick={() => showTermsCondition()} className='agree-span'>I agree to terms and conditions</span>
            </div><br/>
            
            <button 
                className={'otp-continue-button-' + (otpEnable ? 'enable' : 'disable')} 
                onClick={() => otpSubmitted()} 
                type="submit">Continue</button>

            <CountdownTimer resendOtp={resendOtp} initialSeconds={resendOtpTime} />
            
            <div className='div-otp-switch'>
                <span onClick={ () => navigationLogin("loginemailpass") } className='switch-span'>Switch to login?</span>
            </div>
            
            <ReactModal 
                onRequestClose={closeTermModel}
                isOpen={termsModel} 
                contentLabel="Minimal Modal Example"
                className="model-terms"
                overlayClassName="overlay-terms"
            >
                <div dangerouslySetInnerHTML={{__html: termsModelData}} />
            </ReactModal>
        </div>
    );
}

export default Otp;