import { useNavigate } from 'react-router-dom'
import './Goal.css'
import { useState } from 'react'

const Goal = (props) => { 
        const navigate = useNavigate()
        const [checkBook, setCheckBook] = useState(false);
        const [checkDigitalBook, setCheckDigitalBook] = useState(false);
        const [checkTestPortal, setCheckTestPortal] = useState(false);
        const [checkTypingSoftware, setCheckTypingSoftware] = useState(false);
        const [checkVideoCourses, setCheckVideoCourses] = useState(false);
        const [enableGoal, setEnableGoal] = useState(false);

    
        const homeNavigation = () => {
                if (enableGoal) {
                        console.log("enableGoal " + enableGoal)
                        updateGoal()

                } else {
                        console.log("enableGoal " + enableGoal)
                }
                //navigate("/home")
        }

        const updateGoal = async () => {
                try {
                        var goalData = [];
                        if (checkBook) {
                                goalData.push("Book")
                        }
                        if (checkDigitalBook) {
                                goalData.push("Digital Book")
                        }
                        if (checkTestPortal) {
                                goalData.push("Test Portal")
                        }
                        if (checkTypingSoftware) {
                                goalData.push("Typing Software")
                        }
                        if (checkVideoCourses) {
                                goalData.push("Video Courses")
                        }
                        if (props.email !== undefined && props.email !== '') {
                                console.log("email exists")
                                let data = {"email_id": props.email, "goal": goalData};
                                let url = 'http://localhost:5000/update-goal';
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
                                        navigate("/home", {state: {modelType: "mobile", mobile: '', email: props.email}})
                                } else {
                                        console.log('Response Error:', response.statusText);
                                }
                        } else if (props.mobile !== undefined && props.mobile !== '') {
                                console.log("mobile exists")
                                let data = {"mobile_number": props.mobile, "goal": goalData};
                                let url = 'http://localhost:5000/update-goal-mobile';
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
                                        navigate("/home", {state: {modelType: "email", mobile: props.mobile, email: ''}})
                                
                                } else {
                                        console.log('Response Error:', response.statusText);
                                }
                        } else {
                                console.log("mobile email not exists")
                        }
                        
                    } catch (err) {
                        console.log('Error fetching data:');
                        console.error(err);
                    }
        }

        const handleChangeBook = (e) => {
                setCheckBook(e.target.checked)
                if (e.target.checked || checkDigitalBook || checkTestPortal || checkTypingSoftware || checkVideoCourses) {
                        setEnableGoal(true)
                } else {
                        setEnableGoal(false)
                }
        }

        const handleChangeDigitalBook = (e) => {
                setCheckDigitalBook(e.target.checked)
                if (e.target.checked || checkBook || checkTestPortal || checkTypingSoftware || checkVideoCourses) {
                        setEnableGoal(true)
                } else {
                        setEnableGoal(false)
                }
        }

        const handleChangeTestPortal = (e) => {
                setCheckTestPortal(e.target.checked)
                if (e.target.checked || checkBook || checkDigitalBook || checkTypingSoftware || checkVideoCourses) {
                        setEnableGoal(true)
                } else {
                        setEnableGoal(false)
                }
        }

        const handleChangeTypingSoftware = (e) => {
                setCheckTypingSoftware(e.target.checked)
                if (e.target.checked || checkBook || checkTestPortal || checkDigitalBook || checkVideoCourses) {
                        setEnableGoal(true)
                } else {
                        setEnableGoal(false)
                }
        }

        const handleChangeVideoCourses = (e) => {
                setCheckVideoCourses(e.target.checked)
                if (e.target.checked || checkBook || checkTestPortal || checkDigitalBook || checkTypingSoftware) {
                        setEnableGoal(true)
                } else {
                        setEnableGoal(false)
                }
        }

        return (
                <div className='main-div-goal'>
                        <span className='get-started-span-goal'>Choose your Goal</span><br/><br/><br/>
                        <div className='check-div'>
                                <input onChange={handleChangeBook} className='input-check-goal' type="checkbox" />
                                <span className='goal-span'>Books</span>
                        </div>
                        <div className='check-div'>
                                <input onChange={handleChangeDigitalBook} className='input-check-goal' type="checkbox" />
                                <span className='goal-span'>Digital Books</span>
                        </div>
                        <div className='check-div'>
                                <input onChange={handleChangeTestPortal} className='input-check-goal' type="checkbox" />
                                <span className='goal-span'>Test Portal</span>
                        </div>
                        <div className='check-div'>
                                <input onChange={handleChangeTypingSoftware} className='input-check-goal' type="checkbox" />
                                <span className='goal-span'>Typing Software</span>
                        </div>
                        <div className='check-div'>
                                <input onChange={handleChangeVideoCourses} className='input-check-goal' type="checkbox" />
                                <span className='goal-span'>Video Courses</span>
                        </div>
                        <button className={'goal-continue-button-' + (enableGoal ? "enable" : "disable")} onClick={homeNavigation} type="submit">Continue</button>
                </div>
        );
}

export default Goal;