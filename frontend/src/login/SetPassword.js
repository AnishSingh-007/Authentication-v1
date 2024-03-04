import { useState } from 'react';
import './SetPassword.css'
import { useNavigate } from 'react-router-dom';

const SetPassword = (props) => {
    const navigate = useNavigate()
    const [continueEnable, setContinueEnable] = useState(false)
    const [newPass, setNewPass] = useState("")
    const [cnfPass, setCnfPass] = useState("")
    const [passMatch, setPassMatch] = useState(false)

    const setPassword = () => { 
        //setpassword and store to db
        if (continueEnable) {
            if (newPass === cnfPass) {
                console.log("pass match")
                setPassMatch(false)
                updatePass()
            } else {
                setPassMatch(true)
            }
        } else {
            setPassMatch(false)
        }
    }

    const updatePass = async () => {
        try {
            let data = {"email_id": props.email, "pass": newPass};
            let url = 'http://localhost:5000/update-pass';
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
                    if (studentDetails.goal === undefined || studentDetails.goal.length === 0) {
                        console.log("goal undefined || length = 0");
                        navigateGoal()
                    } else if (studentDetails.mobile_number === undefined || studentDetails.mobile_number === "") {
                        console.log("mobile available ");
                        navigate("/home", {state: {modelType: "mobile", mobile: '', email: studentDetails.email_id}})
                    } else {
                        console.log("goal available ");
                        navigate("/home", {state: {modelType: "", mobile: studentDetails.mobile_number, email: studentDetails.email_id}})
                    }
                }
            } else {
                console.log('Response Error:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching data:');
            console.error(err);
        }
    }

    const navigateGoal = () => {
        console.log('navigateGoal') 
        props.form('goal', '', props.email)
    }

    const handleNewPass = (e) => {
        setNewPass(e.target.value)
        if (e.target.value !== "" && cnfPass.length > 0) {
            setContinueEnable(true)
            setPassMatch(false)
        } else {
            setContinueEnable(false)
            setPassMatch(false)
        }
    }

    const handleCnfPass = (e) => {
        setCnfPass(e.target.value)
        if (e.target.value !== "" && newPass.length > 0) {
            setContinueEnable(true)
            setPassMatch(false)
        } else {
            setContinueEnable(false)
            setPassMatch(false)
        }
    }

    return (
        <div className='main-div-set-pass'>
            {
                props.email === '' ? <span className='span-expired'>It seems you are using expired registration link. Please verify with the new registration link.</span> :
            
                <div>
                    <span className='span-below-email'>Below email ID verified successfully</span>
                    <span className='span-email'>{props.email}</span>
                    <label className='label-set-new'>Set New password</label>
                    <input
                        onChange={handleNewPass}
                        value={newPass} 
                        className='input-pass' 
                        type='password' />
                    <label className='label-set-new'>confirm password</label>
                    <input
                        onChange={handleCnfPass}
                        value={cnfPass} 
                        type='password' 
                        className='input-pass'/>
                    {passMatch ? <span className='span-sp-pass-not' >Password does not match.</span> : "" }
                    <button 
                        onClick={setPassword}
                        className={'continue-set-pass-btn-' + (continueEnable ? 'enable' : 'disable')}
                        type="submit">Continue</button>
                </div>
            }
        </div>
    );
}

export default SetPassword;