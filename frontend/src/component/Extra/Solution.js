import './Solution.css'
import './mobilestyle.css'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { FaRegSurprise, FaRegAngry, FaBookmark, FaEye } from "react-icons/fa";
import { useState, useEffect } from 'react';
import MathElement from "./MathMl"
import MathJax from 'react-mathjax-preview'
import SolutionReport from './SolutionReport'
import { IoReorderThreeOutline } from "react-icons/io5"    
import SolutionInstruction from './SolutionInstruction'
import { Row, Col, Modal, Button, Table } from 'react-bootstrap'
import logo from '../images/Bubble-Preloader.gif'               
import { useParams } from 'react-router'
import { useCookies } from 'react-cookie'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"

const Solution = () => {
    const [cookies] = useCookies()
    const { exam_mode_ids, papercode, testseriesid, testtitle, SubjectID } = useParams()
    const exam_mode_id = atob(exam_mode_ids)
    const paper_code = atob(papercode) 
    const test_series_id = atob(testseriesid)
    const test_title = testtitle
    const [isToggled, setIsToggled] = useState(true);
    const [isOptionToggled, setIsOptionToggled] = useState(false);
    const [paperid, setPaperid] = useState(1)
    const [data, setData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [subject, setSubject] = useState(atob(SubjectID))
    const [SubjectName, setSubjectName] = useState()
    const [optionItem, setOption] = useState()
    const [CorrectCount, setCorrectCount] = useState()
    const [IncorrectCount, setIncorrectCount] = useState()
    const [UnattemptedCount, setUnattemptedCount] = useState()
    const [language, setLanguage] = useState('English')
    const [Next, setNext] = useState('Next')
    const [savedquestion, setSavedQuestion] = useState()
    const [saveText, setSavedText] = useState('Save')
    const [show_paper, setshow_paper] = useState(false)
    const [showQuestions, setshowQuestions] = useState(true)
    const [show2, setShow2] = useState(false);
    const [PauseDetails, setPauseDetails] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [studentName, setStudentName] = useState()
    const [FirstLetter, setFirstLetter] = useState()
    const [ToggledType, setIsToggledType] = useState('')
    const [togglevalue, settogglevalue] = useState(false)
    const [lastshow, setlastshow] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const toggle = () => {
        if (!togglevalue) settogglevalue(true);
        else settogglevalue(false);
    }

    const activeThreeoutline = event => {
        setIsActive(current => !current);
    };

    const GoToFirstFun = () => {        
        setlastshow(false)
        setPaperid(1)
        setSubject(19)
    }

    const handleNoFirst = () => {
        setlastshow(false)
    }

    const onToggle = () => {
        setIsToggled(!isToggled);
        setIsOptionToggled(true)
        setIsToggledType('togglebtn')
    }
    const showSolution = () => {
        setIsToggled(!isToggled)
        setIsToggledType('option')
    }

    const chooseOption = (e) => {
        setOption(e.target.value)
        setIsOptionToggled(false)
        setIsToggled(!isToggled);
        setIsToggledType('option')
    }

    const increment = async (e) => {
        if (parseInt(paperid) == data.length) {
            setlastshow(true)
        } else {
            setPaperid(parseInt(paperid) + 1)
            setSubject(e.target.value)
            setNext('Next')
            setSavedQuestion(parseInt(paperid) + 1)
            setSavedText('Save')
            if (ToggledType == 'option') {
                setIsToggled(true);
            } else {
                setIsToggled(isToggled);
            }
        }
    }

    const decrement = async (e) => {
        setPaperid(parseInt(paperid) - 1)
        setSubject(e.target.value)
        setNext('Next')
    }

    const questionNavBtn = (e) => {
        setPaperid(e.target.value)
        setSavedText('Save')
        if (ToggledType == 'option') {
            setIsToggled(true);
        } else {
            setIsToggled(isToggled);
        }
        setIsActive(false);
    }

    const ratingChanged = async (newRating) => {
        let rating_data = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'rating': newRating }
        await fetch("http://localhost:5000/rating", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
            },
            body: JSON.stringify(rating_data)
        });
    }

    useEffect(() => {
        async function stateRes(){
        let dt = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id }
        let state_res = await fetch("http://localhost:5000/solution", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
            },
            body: JSON.stringify(dt)
        });
        state_res = await state_res.json();
        setData(state_res[0]['details'])
        setCorrectCount(state_res[0]['details'][0]['correct_count'])
        setIncorrectCount(state_res[0]['details'][0]['incorrect_count'])
        setUnattemptedCount(state_res[0]['details'][0]['unattempted_ques'])
        setSubjectData(state_res[0]['subjects'])
        setLoading(false)
    }

    stateRes()
    }, [paperid])

    const subjectFun = (e) => {
        setSubject(e.target.value)
        setPaperid(e.target.id)
        setSubjectName(e.target.getAttribute("data-id"))
    }

    const languageFun = (e) => {
        console.log('language: ' + e.target.value) 
        setLanguage(e.target.value)
        setNext('Lg')
    }

    const [theArray, setTheArray] = useState([]);
    const savedQuestion = async (e) => {
        setSavedQuestion(e.target.value)
        if (theArray.includes(e.target.value)) {

        } else {
            setTheArray([...theArray, `${e.target.value}`]);
        }

        if (saveText == 'Save') {
            setSavedText('Saved')
            let dt = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'savedquestion': savedquestion, 'type': 'Save' }
            let state_res = await fetch("http://localhost:5000/bookmark", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
                },
                body: JSON.stringify(dt)
            });
        } else {
            setSavedText('Save')
            let dt = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'savedquestion': savedquestion, 'type': 'Saved' }
            let state_res = await fetch("http://localhost:5000/bookmark", {
                method: 'POST',
                headers: {    
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
                },
                body: JSON.stringify(dt)
            });
        }
    }

    const questionPaperFun = () => {
        if (!show_paper) {
            setshow_paper(true)
            setshowQuestions(false)
        } else {
            setshow_paper(false)
            setshowQuestions(true)
        }
    }

    const handleClose = async (e) => {
        setShow2(true);
        let paper_details = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id }
        let answers_result = await fetch("http://localhost:5000/answerDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
            },
            body: JSON.stringify(paper_details)
        });
        answers_result = await answers_result.json();
        setPauseDetails(answers_result)
    }
    const handleClose2 = () => {
        setShow2(false);
    }

    useEffect(() => {
        async function eidReq(){
        let eid = [{ 'email_id': 'neerajit@ssccglpinnacle.com' }]
        let eid_req = await fetch("http://localhost:5000/testName", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
            },
            body: JSON.stringify(eid)
        });    
        eid_req = await eid_req.json();
        setStudentName(eid_req[0]['full_name'])    
        setFirstLetter(eid_req[0]['full_name'].charAt(0))
    }

    eidReq()
    }, [])

    var rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
    return (
        <>
            <Row className='solution-header mobile-height-10vh'>
                <Col md={7} className="Tests">
                    <p className='paper_test'>Tests</p>
                    <p className='paper_title'>{test_title}</p>
                </Col>

                <Col md={2} className="rating mobile-display-none">
                    <p className='sol-rate-title'>
                        Rate the Test
                    </p>
                    <p className='sol-rate-test'>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={35}
                            activeColor="#ffd700"
                        />
                    </p>
                </Col>
                <Col md={2} className='mobile-display-none'>
                    <Link to={'/testseries/' + 'neerajit@ssccglpinnacle.com'} className='gttt'>Go To Tests</Link>
                </Col>
                <Col md={1} className='mobile-display-none'>
                    <Link to={'/attempted/' + btoa(exam_mode_id) + '/' + btoa(paper_code) + '/' + btoa(test_series_id) + '/' + test_title} className='analysis'>ANALYTICS</Link>
                </Col>
            </Row>
            {isLoading ? <h3 style={{ textAlign: "center" }}><img src={logo} alt="loading..." /></h3> :
                <Row className='solution-header2'>
                    {showQuestions &&
                        <Col md={togglevalue == true ? 12 : 9} className={togglevalue == true ? 'solution-left-div fullscreenmode mobile-width100' : 'solution-left-div mobile-width100'}>
                            <Row className='test-section-list'>
                                <h5 className='section-title mobile-display-none'>SECTION</h5>
                                <Col md={9} className='test-section mobile-subject-scroll mobile-left0'>
                                    {            
                                        subjectData && subjectData.map((sbj) =>
                                            <button className={sbj.sb_id == subject ? 'sol-subject active' : 'sol-subject'} onClick={subjectFun} key={sbj.sb_id} value={sbj.sb_id} id={sbj.ppr_id} data-id={sbj.subject_name}>{sbj.subject_name}</button>
                                        )    
                                    }          
                                </Col>
                                <Col md={2} className='sol-language-section mobile-display-none'>
                                    View in &nbsp;   
                                    <select onChange={languageFun}>
                                        <option value="English">English</option>
                                        <option value="Hindi">Hindi</option>
                                    </select>
                                </Col>
                            </Row>
                            {
                                data && data.filter(pid => pid.qid == paperid).map((item) =>
                                    <>
                                        <Row className='question-holder' key={item.qid}>
                                            <Row className='inner-header'>
                                                <Col md={9} className='qdt'>
                                                    <p className='sub-ques-no mobile-margin0'>Question No.{item.qid}</p>
                                                    <p className={'mobile-display-none sol-correct-sub' + item.answer_type}>{item.answer_type}</p>
                                                    <p className='mobile-display-none'>{item.time_status == 'You are Superfast' ? <span className='sol-spped-icon ttip'><FaRegSurprise /> <span className="tooltiptext">{item.time_status}</span></span> : <span className='sol-speed-slow-icon ttip'><FaRegAngry /><span className="tooltiptext">{item.time_status}</span></span>} </p>
                                                    <p className='mobile-display-none'>You: {item.hrs}:{item.mins}:{item.secs}</p>
                                                    <p className='mobile-display-none'>Marks</p>       
                                                    <p className='mobile-display-none'>{item.answer_type == 'Skipped' ? '' : item.answer_type == 'Correct' ? <span className="sol-marks">{item.positive_marks}</span> : <span className="sol-correct-subIncorrect">{item.negative_marks}</span>}</p>   
                                                </Col>  
                                                <Col md={3} className={togglevalue == true ? 'fullscreenmode-srdt mobile-display-none' : 'srdt mobile-display-none'}>
                                                    <SolutionReport question_id={item.qid} paper_code={paper_code} exam_mode_id={exam_mode_id} test_series_id={test_series_id} />
                                                    <button className={saveText == 'Saved' ? 'savebookmark bookmarked' : item.bookmark_ques == 'Savednvg' ? '1 savebookmark bookmarked' + setSavedText('Saved') : 'savebookmark'} onClick={savedQuestion} value={item.qid}><FaBookmark /> {saveText}</button>
                                                </Col>
                                            </Row>
                                            <div className='sol-question-section'>
                                                <div className='sol-questions mobile-padding10-important'>
                                                    {
                                                        rex.exec(item.question) ? '' : ''
                                                    }
                                                    {
                                                        Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_question} /> : <MathElement elements={item.question} />) : (language == 'Hindi' && subject != 7 ? (rex.exec(item.question) == '' || rex.exec(item.question) == null) ? <MathJax math={item.hindi_question} /> : <MathElement elements={item.hindi_question} /> : rex.exec(item.question) == '' || rex.exec(item.question) == null ? <MathJax math={item.question} /> : <MathElement elements={item.question} />)
                                                    }   
                                                </div>
                                                <div className='sol-option-section mobile-padding10-important'>  
                                                    <div className='sol-aption'>
                                                        {
                                                            isToggled == false ?
                                                                <label className={isOptionToggled == false ? optionItem == 'a' && item.correct_answer == 'a' ? 'c-option' : optionItem == 'a' ? 'correct-no' : item.correct_answer == 'a' ? 'c-option' : 'xyz' : item.answer_type == 'Correct' ? item.choose_answer == 'a' ? 'correct-yes' : 'Incorrectone' : item.answer_type == 'Incorrect' ? item.choose_answer == 'a' ? 'correct-no' : item.correct_answer == 'a' ? 'c-option' : 'xyz' : item.answer_type == 'Skipped' && item.correct_answer == 'a' ? 'c-option' : 'skp'}>
                                                                    <span>{Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option1} /> : <MathElement elements={item.option1} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option1) == '' || rex.exec(item.option1) == null ? <MathJax math={item.hindi_option1} /> : <MathElement elements={item.hindi_option1} /> : rex.exec(item.option1) == '' || rex.exec(item.option1) == null ? <MathJax math={item.hindi_option1} /> : <MathElement elements={item.option1} />)}</span></label> : <label className='reattempt-option'><input type="radio" value="a" name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option1} /> : <MathElement elements={item.option1} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option1) == '' || rex.exec(item.option1) == null ? <MathJax math={item.hindi_option1} /> : <MathElement elements={item.hindi_option1} /> : rex.exec(item.option1) == '' || rex.exec(item.option1) == null ? <MathJax math={item.option1} /> : <MathElement elements={item.option1} />)}
                                                                </label>
                                                        }
                                                    </div>
                                                    <div className='sol-aption'>
                                                        {
                                                            isToggled == false ?
                                                                <label className={isOptionToggled == false ? optionItem == 'b' && item.correct_answer == 'b' ? 'c-option' : optionItem == 'b' ? 'correct-no' : item.correct_answer == 'b' ? 'c-option' : 'xyz' : item.answer_type == 'Correct' ? item.choose_answer == 'b' ? 'correct-yes' : 'Incorrectone' : item.answer_type == 'Incorrect' ? item.choose_answer == 'b' ? 'correct-no' : item.correct_answer == 'b' ? 'c-option' : 'xyz' : item.answer_type == 'Skipped' && item.correct_answer == 'b' ? 'c-option' : 'skp'}>
                                                                    <span>{Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option2} /> : <MathElement elements={item.option2} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option2) == '' || rex.exec(item.option2) == null ? <MathJax math={item.hindi_option2} /> : <MathElement elements={item.hindi_option2} /> : rex.exec(item.option2) == '' || rex.exec(item.option2) == null ? <MathJax math={item.hindi_option2} /> : <MathElement elements={item.option2} />)}</span></label> : <label className='reattempt-option'><input type="radio" value="b" name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option2} /> : <MathElement elements={item.option2} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option2) == '' || rex.exec(item.option2) == null ? <MathJax math={item.hindi_option2} /> : <MathElement elements={item.hindi_option2} /> : rex.exec(item.option2) == '' || rex.exec(item.option2) == null ? <MathJax math={item.option2} /> : <MathElement elements={item.option2} />)}
                                                                </label>
                                                        }
                                                    </div>
                                                    <div className='sol-aption'>
                                                        {
                                                            isToggled == false ?
                                                                <label className={isOptionToggled == false ? optionItem == 'c' && item.correct_answer == 'c' ? 'c-option' : optionItem == 'c' ? 'correct-no' : item.correct_answer == 'c' ? 'c-option' : 'xyz' : item.answer_type == 'Correct' ? item.choose_answer == 'c' ? 'correct-yes' : 'Incorrectone' : item.answer_type == 'Incorrect' ? item.choose_answer == 'c' ? 'correct-no' : item.correct_answer == 'c' ? 'c-option' : 'xyz' : item.answer_type == 'Skipped' && item.correct_answer == 'c' ? 'c-option' : 'skp'}>
                                                                    <span>{Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option3} /> : <MathElement elements={item.option3} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option3) == '' || rex.exec(item.option3) == null ? <MathJax math={item.hindi_option3} /> : <MathElement elements={item.hindi_option3} /> : rex.exec(item.option3) == '' || rex.exec(item.option3) == null ? <MathJax math={item.hindi_option3} /> : <MathElement elements={item.option3} />)}</span></label> : <label className='reattempt-option'><input type="radio" value="c" name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option3} /> : <MathElement elements={item.option3} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option3) == '' || rex.exec(item.option3) == null ? <MathJax math={item.hindi_option3} /> : <MathElement elements={item.hindi_option3} /> : rex.exec(item.option3) == '' || rex.exec(item.option3) == null ? <MathJax math={item.option3} /> : <MathElement elements={item.option3} />)}
                                                                </label>
                                                        }
                                                    </div>
                                                    <div className='sol-aption'>
                                                        {
                                                            isToggled == false ?
                                                                <label className={isOptionToggled == false ? optionItem == 'd' && item.correct_answer == 'd' ? 'c-option' : optionItem == 'd' ? 'correct-no' : item.correct_answer == 'd' ? 'c-option' : 'xyz' : item.answer_type == 'Correct' ? item.choose_answer == 'd' ? 'correct-yes' : 'Incorrectone' : item.answer_type == 'Incorrect' ? item.choose_answer == 'd' ? 'correct-no' : item.correct_answer == 'd' ? 'c-option' : 'xyz' : item.answer_type == 'Skipped' && item.correct_answer == 'd' ? 'c-option' : 'skp'}>
                                                                    <span>{Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option4} /> : <MathElement elements={item.option4} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option4) == '' || rex.exec(item.option4) == null ? <MathJax math={item.hindi_option4} /> : <MathElement elements={item.hindi_option4} /> : rex.exec(item.option4) == '' || rex.exec(item.option4) == null ? <MathJax math={item.hindi_option4} /> : <MathElement elements={item.option4} />)}</span></label> : <label className='reattempt-option'><input type="radio" value="d" name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={item.hindi_option4} /> : <MathElement elements={item.option4} />) : (language == 'Hindi' && subject != 7 ? rex.exec(item.option4) == '' || rex.exec(item.option4) == null ? <MathJax math={item.hindi_option4} /> : <MathElement elements={item.hindi_option4} /> : rex.exec(item.option4) == '' || rex.exec(item.option4) == null ? <MathJax math={item.option4} /> : <MathElement elements={item.option4} />)}
                                                                </label>
                                                        }
                                                    </div>
                                                </div>

                                                <div className='reattempt-section mobile-display-none'>
                                                    {
                                                        isToggled == true ? <><p className='reattempt-mode'>Re-attempt mode: ON</p>
                                                            <p className='reattempt-content'>Now You can re-attempt the question</p></> : <p className='reattempt-content'> Re-attempt is off. turn it on from bottom bar</p>
                                                    }
                                                </div>
                                                <div className='see-solution'>
                                                    {
                                                        isToggled == true ? <><button className='see-solution-mode' onClick={showSolution}><FaEye /> View Solution</button>
                                                            <span className='see-solution-content'>click here to see the solution</span></> : <p style={{ textDecoration: 'underline' }} >Solution</p>
                                                    }
                                                </div>
                                                <div className='ans-solution'>
                                                    {
                                                        isToggled == false ? Next == 'Next' ? (language == 'Hindi' ? <MathElement elements={item.hindi_solution} /> : <MathElement elements={item.solution} />) : (language == 'Hindi' ? <MathJax math={item.hindi_solution} /> : <MathJax math={item.solution} />) : ''
                                                    }
                                                </div>           
                                            </div>    

                                            <button className="mobile-display-block mobile-three-outline desktop-display-none" onClick={activeThreeoutline}><IoReorderThreeOutline /></button>

                                            <Row className='footer-section mobile-height-8-5'>
                                                <button className='sol-previous' onClick={decrement} value={item.sub_prv_id}>Previous</button>
                                                <label className="toggle-switch mobile-display-none">
                                                    <span className='toggle-content mobile-display-none'>Re-attempt questions</span>
                                                    <input type="checkbox" checked={isToggled} onChange={onToggle} />
                                                    <span className="switch mobile-display-none" />
                                                </label>
                                                <button className='sol-next' onClick={increment} value={item.sub_id}>Next</button>
                                            </Row>
                                        </Row>
                                        <Row>
                                            <button className='outer-buttton-full mobile-display-none arrow' onClick={toggle}>{togglevalue == true ? <FaAngleLeft /> : <FaAngleRight />}</button>
                                        </Row>
                                    </>    
                                )
                            }
                        </Col>
                    }
                    <SolutionInstruction data={data} show_paper={show_paper} questionPaperFun={questionPaperFun} />
                   
                    {
                        togglevalue == true ? '' :
                            <Col md={3} className={isActive ? 'mobile-nav-plate mobile-display-block mobile-height-81-5 solution-right-div' : 'solution-right-div mobile-display-none'}>
                                <div className='sidebar-content'>
                                    <Row className='student-details mobile-height-7'>
                                        <Col md={12} style={{ padding: '0px' }}>
                                            <span className="picon">{FirstLetter}</span><span className="pname mobile-margin-left15" style={{marginLeft:'2%'}}>{studentName}</span>
                                        </Col>
                                    </Row>
                                    <Row className='question-states mobile-height-16'>
                                        <Col md={3} className='mobile-width50-perc mobile-margin-bottom15'>
                                            <span className="sol-answer-count">{CorrectCount}</span>
                                            <span className="qps-state">Correct</span>
                                        </Col>
                                        <Col md={5} className='mobile-width50-perc -margin-bottom15'>
                                            <span className="sol-not-visite-count">{UnattemptedCount}</span>
                                            <span className="qps-state">Unattempted</span>    
                                        </Col>
                                        <Col md={4} className='mobile-width50-perc mobile-margin-bottom15'>
                                            <span className="sol-not-answer-count">{IncorrectCount}</span>
                                            <span className="qps-state">Incorrect</span>
                                        </Col>
                                    </Row>

                                    <Row className='time-indicators mobile-display-none'>
                                        <Col md={12} style={{ padding: '0px' }}>
                                            <span style={{ fontSize: '14px' }}>SPEED INDICATORS</span>
                                        </Col>
                                        <Col md={3}>
                                            <span className='spped-icon'><FaRegSurprise /></span>
                                            <p className='speed-text'>Superfast</p>
                                        </Col>
                                        <Col md={3}>
                                            <span className='spped-icon'><FaRegSurprise /></span>
                                            <p className='speed-text'>On Time</p>
                                        </Col>
                                        <Col md={3}>
                                            <span className='spped-slow-icon'><FaRegAngry /></span>
                                            <p className='speed-slow-text'>Slow</p>
                                        </Col>
                                        <Col md={3} style={{ padding: '0px' }}>
                                            <span className='spped-notcorrect-icon'><FaRegSurprise /></span>
                                            <p className='speed-text'>On Time but not Correct</p>
                                        </Col>
                                    </Row>
                                    <div className='question-number-holder mobile-height-45vh mobile-top-23vh mobile-width100 mobile-float-left'>
                                        <Row className='sol-subject-section mobile-width100 mobile-float-left'>    
                                            <Col md={3}>     
                                                <strong>SECTION:</strong>
                                            </Col>         
                                            <Col md={9}>
                                                <span className='subject-name'>{SubjectName}</span>
                                            </Col>                 
                                        </Row>
                                        <div className='sol-navigation-btn mobile-position-relative mobile-top0'>
                                            {
                                                data && data.filter(nvg => nvg.subject_id == subject).map((qs, z) =>
                                                    <button key={z} className={theArray.filter(svq => svq == qs.qid).map((tt, y) => tt == qs.qid ? 'onedigit' + qs.answered_ques + ' Savednvg' : '') + ' onedigit' + qs.answered_ques + ' ' + qs.bookmark_ques} onClick={questionNavBtn} value={qs.qid}>{qs.qid} </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <Row>
                                        <Col md={12} className='marks-action'>
                                            <button className="question-paper-sol" onClick={questionPaperFun}>Question Paper</button>
                                            <button className="summary-sol" onClick={handleClose}>Summary</button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                    }
                </Row>
            }
            <Modal size="lg" backdrop="static" show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Summary</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mobile-width100 overflow-x-scroll'>
                    <Table bordered>
                        <thead className='model-thead'>
                            <tr>
                                <th>Section</th>
                                <th>No. of Questions</th>
                                <th>Answered</th>
                                <th>Not Answered</th>
                                <th>Marked for Review</th>
                                <th>Not Visited</th>
                            </tr>
                        </thead>
                        <tbody className='model-tbody'>
                            {
                                PauseDetails && PauseDetails.map((dt, i) =>
                                    <tr key={i}>
                                        <td>{dt.subject_name}</td>
                                        <td>{dt.questions}</td>
                                        <td>{dt.answered}</td>
                                        <td>{dt.notanswered_count}</td>
                                        <td>{dt.marked_answered_count}</td>
                                        <td>{dt.not_visited}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer className='mobile-float-left mobile-display-block'>  
                    <Button variant="secondary" className='sol-go-to-submit-test mobile-float-left mobile-margin-right-inherit' onClick={handleClose2}>
                        Close
                    </Button>
                    <div className='desktop-analysis mobile-analysis'><Link to={'/attempted/' + btoa(exam_mode_id) + '/' + btoa(paper_code) + '/' + btoa(test_series_id) + '/' + test_title} className='test-analysis mobile-float-right mobile-position-relative-important'>Test Analysis</Link></div>
                </Modal.Footer>       
            </Modal>       
            <Modal size="md" backdrop="static" show={lastshow}>
                <Modal.Body className='are-you-sure' style={{ fontSize: '14px' }}>You have reached the last question of the exam. Do you want to go to the first question ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleNoFirst}>
                        No
                    </Button>
                    <Button variant="primary" className='pause-yes' onClick={GoToFirstFun} value="pause">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}  
export default Solution;