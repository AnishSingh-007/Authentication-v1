import './Instruction.css'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'

const InstructionNew = () => {
    const [cookies] = useCookies()
    const navigate = useNavigate()
    const { exam_mode_id, papercode, test_series_id } = useParams()
    const aexam_mode_id = atob(exam_mode_id)
    const apapercode = atob(papercode)
    const atest_series_id = atob(test_series_id)
    const [checked, setChecked] = useState('disable')
    const [language, setLanguage] = useState('English')
    const [name, setName] = useState()
    const [FirstLetter, setFirstLetter] = useState()
    const [TestDetails, setTestDetails] = useState()

    const renderTooltip = props => (
        <Tooltip {...props}>Please accept terms and condition before proceeding</Tooltip>
    );

    const handleChangeChk = (e) => {
        if (e.target.checked == true) {
            setChecked('')
        } else {
            setChecked('disable')
        }
    }

    const langFun = (e) => {
        setLanguage(e.target.value)
    }

    const startTest = () => {
        let paperid = 1;
        navigate(`/test/${btoa(language)}/${btoa(apapercode)}/${btoa(aexam_mode_id)}/${btoa(atest_series_id)}/${btoa(paperid)}`);
    }
                          
    useEffect(() => {
        async function eId(){
        let eid = [{ 'email_id': cookies.email_id }]
        let eid_req = await fetch("http://localhost:5000/testName", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"   
            },
            body: JSON.stringify(eid)   
        });
        eid_req = await eid_req.json();    
        setName(eid_req[0]['full_name'])
        setFirstLetter(eid_req[0]['full_name'].charAt(0))
        }

        eId(0)
    }, [])

    useEffect(() => {
        async function pCode(){
        let p_code = { 'paper_code': apapercode }
        let p_req = await fetch("http://localhost:5000/testMarkDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(p_code)
        });
        p_req = await p_req.json();
        console.log(p_req)
        setTestDetails(p_req)
        }

        pCode()    
    }, [])

    return (
        <>
            {
                TestDetails && TestDetails.map((item, i) =>

                    <Row className='main-container'>
                        <Row className="intruction_header">
                            <Col md={2} className='mobile-width-50-perc'>
                                <h2><img src="https://ssccglpinnacle.com/images/pinnacle_logo.png" alt="logo" /></h2>
                            </Col>
                            <Col md={10} className='mobile-display-none'>
                                <h2 className='instruction-papercode-tile'>{item.title}</h2>
                            </Col>
                        </Row>
                        <Row className='instruction-row'>
                            <Col md={9} className='ques-row mobile-width100' >
                                <Row className='newinstruction-div mobile-width100'>
                                    <ol className='instruction-ol'>
                                        <p className='general-newinstruction-name'>{item.title}</p>
                                        <p>
                                            <span className='duration'>Duration: {item.time} Mins</span>
                                            <span className='maximum-mark'>Maximum Marks: {item.questions}</span>
                                            <p className='read-inst'>Read the following instructions carefully.</p>
                                            <ol start="1" className="for-all-exams">
                                                <li>
                                                    <p>The test contains a total of {item.questions} questions.</p>
                                                </li>

                                                <li>
                                                    <p>Test is based on the TCS exam pattern.</p>
                                                </li>
                                                <li>
                                                    <p>Each question has 4 options out of which only one is correct.</p>
                                                </li>
                                                <li>
                                                    <p>You have to finish the test in the given time. </p>
                                                </li>
                                                <li>
                                                    <p>There is negative marking {item.minus_marking} marks will be
                                                        deducted in case of wrong answer and {item.marks} mark will
                                                        be given in case correct answer. Unattempted question
                                                        marks will not be deducted or awarded. Instead of making
                                                        guesses, students can choose not to attempt the question.</p>
                                                </li>
                                                <li>
                                                    <p>You can attempt the test once, so attempt all questions
                                                        and take the test seriously to get the full advantages of the
                                                        test. So don’t leave the test unattempted. Submit the test once
                                                        you attempt all questions.</p>
                                                </li>
                                            </ol>
                                        </p>
                                    </ol>
                                </Row>
                                <Row className='newinstruction-bottom mobile-width100 overflow-x-scroll mobile-height40vh'>
                                    <Row>          
                                        <Col>
                                            <p className='lang-select'>Choose Your default language:
                                                <select className='chooselang' onChange={langFun}>
                                                    <option value="English">--select--</option>
                                                    <option value="English">English</option>
                                                    <option value="Hindi">Hindi</option>
                                                </select>
                                            </p>
                                            <p className='l-info'>Please note all questions will appear in your chosen default language, This language can be changed for a particular question later on.</p>
                                            <hr />
                                            <p>Declaration:</p>
                                            <p><input type="checkbox" id="topping" name="topping" value="1" placeholder='hello' onChange={handleChangeChk} />  <label for="topping" className='read-carefully'>
                                                I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else’s advantage will lead to my immediate disqualification. The decision of ssccglpinnacle.com will be final in these matters and cannot be appealed.</label></p>
                                        </Col>
                                    </Row>                   
                                    <Row className='second-bottom mobile-width100'>
                                        <Col>
                                            <Link to='/instruction' className='previous'>Previous</Link>
                                            {
                                                checked == 'disable' ? <OverlayTrigger placement="top" overlay={renderTooltip}>
                                                    <button className='begin disable mobile-margin-right0'>I am ready to begin</button>
                                                </OverlayTrigger> : <button className='begin mobile-margin-right0' onClick={startTest}>I am ready to begin</button>
                                            }
                                        </Col>
                                    </Row>
                                </Row>             
                            </Col>

                            <Col md={3} className='nav-plate mobile-display-none'>
                                <Row className='navigation_plate'>
                                    <Col className='instruction-plate'>
                                        <button className='inst-name'>{FirstLetter}</button>
                                        <p className='student-name'>{name}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                )
            }
        </>
    )
}
export default InstructionNew