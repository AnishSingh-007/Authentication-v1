import './header1.css'
import './mobilestyle.css'
import { Row, Col, Modal, Button, Table } from 'react-bootstrap'
import CountDownTimer from './CountDownTimer'
import QuestionNavigation from './QuestionNavigation'
import Questions from './Questions'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa" 
import { IoReorderThreeOutline } from "react-icons/io5"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Qinstruction from './Qinstruction'
import { useCookies } from 'react-cookie'
import logo from '../images/Bubble-Preloader.gif';
                                                     
function Header1({ hrs, mins, test_series_id, exam_mode_id, secs, paper_code, NotVisited, subjectID, subject_name, Answered, NotAnswered, Marked, MarkedAnswered, title, languages, pids, TestTp }) {

    const hoursMinSecs = { hours: hrs, minutes: mins, seconds: secs }
    const [togglevalue, settogglevalue] = useState(false)
    const [cookies] = useCookies()
    const [paperid, setPaperid] = useState(pids)
    const [option, setOption] = useState()
    const [testType, setTestType] = useState('sectional')
    const [data, setData] = useState([])
    const [language, setLanguage] = useState(languages)
    const [subject, setSubject] = useState(subjectID)
    const [subjectData, setSubjectData] = useState([])
    const [AnswerStatus, setAnswerStatus] = useState([])
    const [AnsweredCount, setAnsweredCount] = useState(Answered)
    const [NotAnsweredCount, setNotAnsweredCount] = useState(NotAnswered)
    const [MarkedCount, setMarkedCount] = useState(Marked)
    const [MarkedAnsweredCount, setMarkedAnsweredCount] = useState(MarkedAnswered)
    const [NotVisitedCount, setNotVisitedCount] = useState(NotVisited)
    const [paper_ids, setPaper_ids] = useState()
    const [SubjectName, setSubjectName] = useState(subject_name)
    const [SingleTm, setSingleTm] = useState()
    const [show, setShow] = useState(false);
    const [pause, setPause] = useState(false);
    const [show2, setShow2] = useState(false);
    const [lastshow, setlastshow] = useState(false);
    const [rmTm, setrmTm] = useState()
    const [eidData, setEidData] = useState()
    const [PauseDetails, setPauseDetails] = useState([])
    const [show_paper, setshow_paper] = useState(false)
    const [showQuestions, setshowQuestions] = useState(true)
    const [instructionShow, setInstructionShow] = useState(false)
    const [Next, setNext] = useState('Next')
    const [buttonType, setButtonType] = useState()
    const navigate = useNavigate()
    const handle = useFullScreenHandle();
    const [theArray, setTheArray] = useState([]);
    const [FirstLetter, setFirstLetter] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isActive, setIsActive] = useState(false);
    const [choosed_answer, setchoosed_answer] = useState();
    const [PrevValue, setPrevValue] = useState()
    const [CurrentPaperId, setCurrentPaperId] = useState()
	const [questionNavId, setQuestionNavId] = useState()
	const [lastQuestion, setLastQuestion] = useState()

    /* if (cookies.email_id) {
        history.pushState(null, null, location.href);
        window.onpopstate = function (event) {
            history.go(1);
        }
    } */

    const activeThreeoutline = event => {
        setIsActive(current => !current)
    }

    const GoToFirstFun = () => {
        setlastshow(false)
        setPaperid(1)
        setSubject(subjectID)
        setOption(data[0].answer)
    }                                                                      

    const handleNoFirst = () => {
        setlastshow(false)
    }

    const handleClose = async (e) => {
        setButtonType(e.target.value)
        setShow(false);
        //setPause(!pause);
        setShow2(true);
        let paper_details = { 'email_id': 'neerajit@ssccglpinnacle.com', 'paper_code': paper_code, 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id }
        let answers_result = await fetch("http://localhost:5000/answerDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paper_details)
        });
        answers_result = await answers_result.json();
        setPauseDetails(answers_result)
    }

    const handleClose2 = () => {
        setShow2(false);    
        //setPause(!pause);
    }
                                     
    const handleCloseTest = async () => {
        let pause_details = { 'email_id': 'neerajit@ssccglpinnacle.com', 'paper_code': paper_code, 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'rTem': rmTm, 'pause_question': paperid }
        await fetch('http://localhost:5000/pauseTest', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pause_details)
        })
        navigate(`/testseries/neerajit@ssccglpinnacle.com`);
    }
             
    const handleCloseNo = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);
               
    const submitTest = async () => {
        let submit_details = { 'email_id': 'neerajit@ssccglpinnacle.com', 'paper_code': paper_code, 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'rTem': rmTm }
        let submit_result = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submit_details)
        })
        submit_result = await submit_result.json()
        if (submit_result.status == 'success') {
            if (TestTp == 'live') {
                navigate(`/LiveTestResult/${btoa(exam_mode_id)}/${btoa(paper_code)}/${btoa(test_series_id)}`);
            } else {
                navigate(`/attempted/${btoa(exam_mode_id)}/${btoa(paper_code)}/${btoa(test_series_id)}/${title}`);
            }
        }
    }
      
    const toggle = () => {
        if (!togglevalue) settogglevalue(true);
        else settogglevalue(false);
    }

    const increment = (e) => { 
	                    
        let y = paperid - 1                                                  
       // data[y].answer == '0' && option == '0' ?  data[y].answer = '0' : option == '0' && data[y].answer != '0' ? '' : data[y].answer = option   
                                                                                                         
        setQuestionNavId(paperid);
         
        if (parseInt(paperid) == data.length) {
            setPaperid(parseInt(paperid))
            answerFun(e.target.id, e.target.id, 'nxt')
            setNext('Next')
            setLastQuestion(1)

            if (e.target.id == 1 && data[y].answer == '0' && (option == '' || option == undefined || option == 0 || option == 'undefined')) {
              
                setPrevValue('2')
                const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            } else if (e.target.id == 1 && (data[y].answer != '0' || option != '0') && (data[y].answer != '' || option != '') && (data[y].answer != '' || option != '0')) {
                
                setPrevValue('1')
                const obj = { 'item_no': paperid, 'Type': 1, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            } else if (e.target.id == 4 && (data[y].answer == '0' && (option == '0' || option == ''))) {
              
                setPrevValue('3')
                const obj = { 'item_no': paperid, 'Type': 3, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            } else if (e.target.id == 4 && (data[y].answer != '0' || (option != '0' || option == ''))) {
                 
                setPrevValue('4')                        
                const obj = { 'item_no': paperid, 'Type': 4, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            }else{
                setPrevValue('2')  
            }                                                            
            setlastshow(true)                                                             
        } else {                
            setPaperid(parseInt(paperid) + 1)
            setOption('0') 
            setLastQuestion(parseInt(paperid) + 1)                         
            if (e.target.id == 1 && (data[y].answer == '0' || data[y].answer == '' || data[y].answer == undefined) && (option == '' || option == undefined || option == 0 || option == 'undefined')) {
				
                setPrevValue('2')                                                
                const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            } else if (e.target.id == 1 && (data[y].answer != '0' || option != '0') && (data[y].answer != '' || option != '') && (data[y].answer != '' || option != '0')) {           
				                                                                                       
                setPrevValue('1')
                const obj = { 'item_no': paperid, 'Type': 1, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            } else if (e.target.id == 4 && (data[y].answer == '0' && (option == '0' || option == ''))) {
                         
                setPrevValue('3')            
				const obj = { 'item_no': paperid, 'Type': 3, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            } else if (e.target.id == 4 && (data[y].answer != '0' || (option != '0' || option == ''))) {
              
                setPrevValue('4')                         
				const obj = { 'item_no': paperid, 'Type': 4, 'SingleTm': SingleTm, 'option': option };
                setTheArray([...theArray, obj]);
            }else{
                setPrevValue('2')  
            }
            setchoosed_answer("");                                 
            answerFun(e.target.id, parseInt(paperid) + 1, 'nxt')
            setNext('Next')            
        }
         
    }
                                                                                                                       
    const BlurAnswerValue = (prevAnswerValue) => { 
                                 
        setPrevValue(prevAnswerValue)           
    }                                            

    const questionNavigationFun = (e) => {
		setPaperid(e.target.value)
       
        //setOption(e.target.id)
        let z = e.target.value - 1
        setOption(data[z].answer)                
        setCurrentPaperId(e.target.value)  
		
		if (questionNavId == e.target.value) {
			
		} else {         
			
			setQuestionNavId(e.target.value);                                                    
                  
			if (PrevValue != undefined || PrevValue != '1' || PrevValue != '2' || PrevValue != '3' || PrevValue != '4') {
				var PrevStatus = PrevValue.split(',').pop();
			} else {              
				var PrevStatus = PrevValue;                                 
				//var PrevStatus = choo;
			}

			if (PrevStatus == undefined || PrevStatus == '0') {
				
				answerFun('2', e.target.value, 'nav')
			} else if (PrevStatus == 1) {
			
				answerFun('1', e.target.value, 'nav')
			} else if (PrevStatus == 2) {
				
				answerFun('2', e.target.value, 'nav')
			} else if (PrevStatus == 3) {
				
				answerFun('3', e.target.value, 'nav') 
			} else if (PrevStatus == 4) {
				
				answerFun('4', e.target.value, 'nav')
			}                   
                
			if (PrevStatus == undefined || PrevStatus == '0') { 
				
				const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
				setTheArray([...theArray, obj]);                
			} else if (PrevStatus == 1 && lastQuestion != undefined ? (data[lastQuestion-1].answer != '0' && data[lastQuestion-1].answer != '' && data[lastQuestion-1].answer != undefined) : PrevStatus == 1 ) {      
				                                                                            
                const obj = { 'item_no': paperid, 'Type': 1, 'SingleTm': SingleTm, 'option': option };
				setTheArray([...theArray, obj]);                                    
			} else if (PrevStatus == 2 && lastQuestion != undefined ? (data[lastQuestion-1].answer == '0' || data[lastQuestion-1].answer == '') : PrevStatus == 2) {                                             
				       
				const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
				setTheArray([...theArray, obj]);
			} else if (PrevStatus == 3) {
				                          
				const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
				setTheArray([...theArray, obj]);
			} else if (PrevValue == 4) {
                                     
				const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
				setTheArray([...theArray, obj]);
			}
			setIsActive(false);
		}
		
		setLastQuestion(e.target.value);        
                       
    }

    const answerFun = async (answer_status, CurrentPaperId, SaveType) => {
		
        let z = paperid - 1;                                                                                                  
                                                                                             
        let answers = { 'email_id': 'neerajit@ssccglpinnacle.com', 'paper_code': paper_code, 'test_series_id': test_series_id, 'exam_mode_id': exam_mode_id, 'paper_id': paperid, 'CurrentPaperId': CurrentPaperId, 'option': option == '0' && data[z].answer != '0' ? data[z].answer : option == undefined ? "" : option != '0' ? option : '' , 'answer_status': answer_status, 'SingleTm': SingleTm, 'rTem': rmTm, 'subject': subject, 'SaveType': SaveType }
                                                                                                                                                                                                                     
        let answers_res = await fetch("http://localhost:5000/save_next", { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answers)
        });
        answers_res = await answers_res.json();
        setSubject(answers_res.sub_id)
        setSubjectName(answers_res.subjectname)
        setAnswerStatus(answers_res.answer_status)
        setAnsweredCount(answers_res.answered_count)
        setNotAnsweredCount(answers_res.notanswered_count)
        setMarkedCount(answers_res.marked_count)
        setMarkedAnsweredCount(answers_res.marked_answered_count)
        setNotVisitedCount(answers_res.not_visited)
        setPaper_ids(answers_res.paper_ids)       
        //setchoosed_answer(answers_res.choosed_answer)
    }

    const chooseFun = (e) => {
        setOption(e.target.value)
    }

    const resetRadioState = async () => {
        setOption('');
                                                                            
        let c = paperid - 1;                                            
        data[c].answer = '';
        setPrevValue('2')
        data[c].answered_ques = '2';            
        
        const obj = { 'item_no': paperid, 'Type': 2, 'SingleTm': SingleTm, 'option': option };
        setTheArray([...theArray, obj]);            
                            
        let cleardt = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'paper_id': paperid }
        await fetch("http://localhost:5000/clearResponse", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cleardt)
        });
    }

    const testTypeFun = (e) => {
        const testType = (e.target.value)
        setTestType(testType)
    }

    useEffect(() => {
        async function stateRes(){
        let dt = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id }
        let state_res = await fetch("http://localhost:5000/index", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dt)
        });
        state_res = await state_res.json();
        setData(state_res[0]['details'])
      
        setSubjectData(state_res[0]['subjects'])
		          
        setLoading(false)
        }

        stateRes()
    }, [])
	
	useEffect(() => {
        async function stateRes2(){
        let dt = { 'paper_code': paper_code, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'question_no' : paperid }
        let state_res = await fetch("http://localhost:5000/pauseQuestionChoosedAnswer", { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dt)
        });
        state_res = await state_res.json();
        //setData(state_res[0]['choosed_answer'])
		setchoosed_answer(state_res.choosed_answer);  
		setOption(state_res.choosed_answer);
		setPrevValue(state_res.answer_status);
		setSubjectName(state_res.subject_name);
		setSubject(state_res.subject_id);
		setAnswerStatus(state_res.answer_status);
		setQuestionNavId(paperid);
		
        //setSubjectData(state_res[0]['subjects'])
		
        //setLoading(false)
        }

        stateRes2()
    }, [])

    useEffect(() => {
        async function eidReq(){
        let eid = [{ 'email_id': 'neerajit@ssccglpinnacle.com' }]
        let eid_req = await fetch("http://localhost:5000/testName", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eid)
        });
        eid_req = await eid_req.json();
        setEidData(eid_req[0]['full_name'])
        setFirstLetter(eid_req[0]['full_name'].charAt(0))
        }

        eidReq()
    }, [])

    const languageFun = (e) => {
        setLanguage(e.target.value)
        setNext('Lg')
        //answerFun('2')
    }

    const subjectFun = async (e) => {
	
        setPaperid(e.target.id)
        setSubject(e.target.value)
        setSubjectName(e.target.getAttribute("data-id"))
	
        let answers = { 'email_id': 'neerajit@ssccglpinnacle.com', 'paper_code': paper_code, 'test_series_id': test_series_id, 'exam_mode_id': exam_mode_id, 'paper_id': paperid, 'CurrentPaperId': e.target.id, 'option': option, 'answer_status': AnswerStatus, 'SingleTm': SingleTm, 'rTem': rmTm, 'subject': subject }

        let answers_res = await fetch("http://localhost:5000/save_next", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answers)
        });
        answers_res = await answers_res.json();
        setOption(answers_res.choosed_answer);
		setAnswerStatus(answers_res.answer_status_new);
		setPrevValue("" + answers_res.answer_status_new);
		setchoosed_answer(answers_res.choosed_answer);  
		setQuestionNavId(e.target.id);
		setSubject(answers_res.sub_id)
        setSubjectName(answers_res.subjectname) 
    } 

    const sTimeFun = (sTm) => {
        setSingleTm(sTm)
    }

    const rmTimeFun = (rTm) => {
        setrmTm(rTm)
    }

    const questionPaperFun = () => {
        if (!show_paper) {
            setshow_paper(true)
            setshowQuestions(false)
            setInstructionShow(false)
        }
        else {
            setshow_paper(false)
            setshowQuestions(true)
            setInstructionShow(false)
        }
    }

    const instructionFun = () => {
        if (!instructionShow) {
            setshow_paper(false)
            setshowQuestions(false)
            setInstructionShow(true)
        } else {
            setshow_paper(false)
            setshowQuestions(true)
            setInstructionShow(false)
        }
    }

    if (rmTm == '00:00:00') {
        submitTest()
    }

    return (
        <React.Fragment>
            <FullScreen handle={handle}>
                {isLoading ? <h3 style={{ textAlign: "center" }}><img src={logo} alt="loading..." /></h3> :
                    <Row className='main-container'>
                        <Row className="header1 mobile-box-shadow-none mobile-padding0 mobile-height-14vh">
                            <Col md={1} className="mobile-padding0 mobile-box-shadow80808042" style={{ padding: '0' }}>
                                <h2><img className="mobile-pinnacle-logo" src="https://ssccglpinnacle.com/images/pinnacle_logo.png" alt="logo" /></h2>
                            </Col>
                            <Col md={5}>
                                <h2 className='papercode-tile mobile-margin-top10 mobile-text-align-center'>{title}</h2>
                            </Col>
                            <Col md={3}>
                                <h2 className='timer mobile-timer'>Time Left: <CountDownTimer hoursMinSecs={hoursMinSecs} paper_code={paper_code} Paper_id={paperid} pause={pause} rmTimeFun={rmTimeFun} /></h2>
                            </Col>
                            <Col md={2} className="mobile-display-none" style={{ paddingRight: '5px' }}>
                                <button className='full-screen' onClick={handle.active == false ? handle.enter : handle.exit}>Switch Full Screen</button>
                            </Col>
                            <Col md={1} className="mobile-display-none" style={{ paddingLeft: '0px' }}>
                                {
                                    handle.active == true ? '' : <button className='pause' onClick={handleShow}>Pause</button>
                                }
                            </Col>
                        </Row>

                        <Row className='q-sction mobile-q-sction'>
                            {
                                togglevalue == true ? <Col md={12} className='ques-row fullscreenmode'>
                                    <Row className="header2 mobile-header2">
                                        <Col md={1}>
                                            <h2 className='section'>SECTIONS</h2>
                                        </Col>
                                        {
                                            testType && testType == 'full' ? <Col md={9}><button className='subject active'>Full Test</button></Col> :
                                                <Col md={9} className="mobile-subject-scroll">
                                                    {
                                                        subjectData && subjectData.map((sbj) =>
                                                            <button className={`subject ${sbj.sb_id == subject ? "active" : ""} mobile-subject`} value={sbj.sb_id} id={sbj.ppr_id} data-id={sbj.subject_name} key={sbj.ppr_id} onClick={subjectFun}>{sbj.subject_name}</button>
                                                        )
                                                    }
                                                </Col>
                                        }
                                        <Col md={2}>
                                            <span style={{ fontSize: '14px' }}>View In </span>
                                            <select className='lang' onChange={languageFun}>
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row className='questin-div'>
                                        <Col md={12} className='question-section'>
                                            {
                                                data && data.filter(pid => pid.qid == paperid).map((item) => {
													
                                                    return <Questions key={item.qid} paper_code={paper_code} chooseOption={chooseFun} optionItem={option} {...item} language={language} singleTm={sTimeFun} pause={pause} subject={subject} Next={Next} choosed_answer={item.answer} theArray={theArray} />
													
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    <Row className='bottom-div fullscreenbottom'>
                                        <Col>
                                            <button className='mark-review' id="4" onClick={increment}>Mark for Review & Next</button>
                                            <button className='clear-response' onClick={resetRadioState}>Clear Response</button>
                                            <button className='save-next' id="1" onClick={increment}>Save & Next</button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <button className='outer-buttton-full arrow' onClick={toggle}><FaAngleLeft /></button>
                                    </Row>
                                </Col> : showQuestions &&
                                <Col md={9} className='ques-row mobile-width100'>
                                    <Row className="header2 mobile-header2">
                                        <Col md={1} className="mobile-display-none">
                                            <h2 className='section'>SECTIONS</h2>
                                        </Col>
                                        {
                                            testType && testType == 'full' ? <Col md={9}><button className='subject active'>Full Test</button></Col> :
                                                <Col md={9} className="mobile-subject-scroll">
                                                    {
                                                        subjectData && subjectData.map((sbj) =>
                                                            <button className={`subject ${sbj.sb_id == subject ? "active" : ""} mobile-subject`} value={sbj.sb_id} id={sbj.ppr_id} data-id={sbj.subject_name} key={sbj.ppr_id} onClick={subjectFun}>{sbj.subject_name}</button>
                                                        )
                                                    }
                                                </Col>
                                        }
                                        <Col md={2} className="mobile-display-none">
                                            <span style={{ fontSize: '14px' }}>View In </span>
                                            <select className='lang' onChange={languageFun}>
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row className='questin-div'> 
                                        <Col md={12} className='question-section'>
                                            {
                                                data && data.filter(pid => pid.qid == paperid).map((item) => {
                                                    return <Questions key={item.qid} paper_code={paper_code} chooseOption={chooseFun} optionItem={option} {...item} language={language} singleTm={sTimeFun} pause={pause} subject={subject} Next={Next} choosed_answer={item.answer} theArray={theArray} />
                                                })
                                            }         
                                        </Col>
                                    </Row>
                                    <Row className='bottom-div mobile-width100-perc'>
                                        <Col>
                                            <button className='mark-review mobile-font-size12 mobile-text-change' id="4" onClick={increment}><span id="4">Mark for Review & Next</span></button>
                                            <button className='clear-response mobile-font-size12 mobile-text-change-clear' onClick={resetRadioState}><span onClick={resetRadioState}>Clear Response</span></button>
                                            <button className='save-next' id="1" onClick={increment}>Save & Next</button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <button className='outer-buttton mobile-display-none' onClick={toggle}><FaAngleRight /></button>
                                    </Row>
                                </Col>
                            }

                            <Qinstruction data={data} show_paper={show_paper} instructionShow={instructionShow} questionPaperFun={questionPaperFun} instructionFun={instructionFun} />

                            <button className="mobile-display-block mobile-three-outline desktop-display-none" onClick={activeThreeoutline}><IoReorderThreeOutline /></button>

                            {
                                togglevalue == true ? '' :
                                    <Col md={3} className={isActive ? 'nav-plate mobile-display-block mobile-nav-plate' : 'nav-plate mobile-display-none'}>
                                        <Row className='navigation_plate'>
                                            <Col className='plate'>   
                                                <QuestionNavigation questionNavigationfun={questionNavigationFun} paper_code={paper_code} full_name={eidData} FirstLetter={FirstLetter} test_type={testTypeFun} qno={data} subject={subject} testType={testType} AnswerStatus={AnswerStatus} AnsweredCount={AnsweredCount} NotAnsweredCount={NotAnsweredCount} MarkedCount={MarkedCount} MarkedAnsweredCount={MarkedAnsweredCount} NotVisitedCount={NotVisitedCount} paper_ids={paper_ids} SubjectName={SubjectName} theArray={theArray} BlurAnswerValue={BlurAnswerValue} />

                                                <Row className='submit-colum'>
                                                    <Row className='instruction-column'>
                                                        <Col style={{ padding: '0' }}>
                                                            <button onClick={questionPaperFun}>Question Paper</button>
                                                            <button onClick={instructionFun}>Instructions</button>
                                                        </Col>
                                                    </Row>
                                                    <Row className='submit-test'>
                                                        <Col style={{ padding: '0' }}>
                                                            {
                                                                handle.active == true ? '' : <button onClick={handleClose} value="submit">Submit Test</button>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                            }
                        </Row>
                    </Row>
                }

                <Modal size="md" backdrop="static" show={show}>
                    <Modal.Body className='are-you-sure'>Are you sure you want to pause this test?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseNo}>
                            No
                        </Button>
                        <Button variant="primary" className='pause-yes' onClick={handleClose} value="pause">
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" backdrop="static" show={show2} onHide={handleClose2}>
                    <Modal.Body>
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
                    {
                        buttonType == 'submit' || buttonType == '' ? <Modal.Footer>
                            <Button variant="secondary" className='go-to-submit-test' onClick={handleClose2}>
                                Close
                            </Button>
                            <Button variant="primary" className='resume-test' onClick={submitTest}>
                                Submit
                            </Button>
                        </Modal.Footer> : <Modal.Footer>
                            <Button variant="secondary" className='go-to-test' onClick={handleCloseTest}>
                                Tests
                            </Button>
                            <Button variant="primary" className='resume-test' onClick={handleClose2}>
                                Resume Test
                            </Button>
                        </Modal.Footer>
                    }
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
            </FullScreen>
        </React.Fragment>
    )
}
export default Header1