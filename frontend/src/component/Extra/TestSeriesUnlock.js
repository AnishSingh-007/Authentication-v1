//import './Header1.css'
import './TestSeries.css'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
/* import TestSeriesHeader from './TestSeriesHeader'
import TestSeriesFooter from './TestSeriesFooter' */
import { useParams } from 'react-router'
import TestOverview from './TestOverview'
import { BsClockFill } from 'react-icons/bs';
import { AiOutlineFile } from 'react-icons/ai';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { useCookies } from 'react-cookie'

function TestSeriesUnlock() {
	const [cookies, setCookie] = useCookies()
	const { testid, exam_post_id, exam_mode_id } = useParams()
	const [TestData, setTestData] = useState([])
	const navigate = useNavigate()
	const [TestAccess, setTestAccess] = useState()
	const [CglAccess, setTestAccessCgl] = useState()
	const [TierName, setPostTierName] = useState()
	const [ExamID, setExamID] = useState()
	const [show, setShow] = useState(false);
	const [otpshow, setOtpShow] = useState(false);
	const [showEmail, setEmailShow] = useState(false);
	const [RegisteredStd, setRegistered] = useState();
	const [mobile, setMobile] = useState('')
	const [Otp, setOtp] = useState()
	const [EnterOtp, setEnterOtp] = useState()
	const [EmailID, setEmailID] = useState()
	const [FullName, setFullName] = useState()

    console.log(testid)
           
	useEffect(() => {      
		async function testData(){        
		let test_data = { 'email_id': 'neerajit@ssccglpinnacle.com', 'test_series_id': testid }
		let test_data_request = await fetch("http://localhost:5000/TestSeriesDetails2", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},              
			body: JSON.stringify(test_data)
		});
		let test_data_response = await test_data_request.json();
		setTestData(test_data_response)
	}
          
	testData()
	}, [])

	useEffect(() => {
		async function testAccess(){
		let test_access = [{ 'email_id': 'neerajit@ssccglpinnacle.com' }]
		let test_access_request = await fetch("http://localhost:5000/testSeriesAccess", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(test_access)
		});
		let test_access_response = await test_access_request.json();
		setTestAccess(test_access_response.user_status)
	}
                          
	testAccess()
	}, [])

	useEffect(() => {
		async function testAccessCgl(){
		let test_access_cgl = [{ 'email_id': 'neerajit@ssccglpinnacle.com' }]
		let test_access_request_cgl = await fetch("http://localhost:5000/testSeriesAccessCglTier2", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(test_access_cgl)
		});
		let test_access_response_cgl = await test_access_request_cgl.json();   
		setTestAccessCgl(test_access_response_cgl.cgl_access)
	}

	testAccessCgl()
	}, []) 

	const handleClose = () => setShow(false);       
	const handleShow = () => setShow(true);

	const handleOtp = async() => {
		setOtpShow(true);
		setShow(false);        
 
		let otp_data = { 'mobile': mobile, 'name': 'Student' }
		let otp_request = await fetch("http://localhost:5000/otp", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(otp_data)
		});
		let otp_response = await otp_request.json();
		setOtp(otp_response.OTP)
		//setOtp('1234');
	}

	const handleEmail = () => {
		if (EnterOtp == Otp) {
			setOtpShow(false)
			setEmailShow(true);
		} else {
			alert('Please enter the OTP sent to ' + mobile)
		}
	}
                  
	const BuyFun = () => {
		if(exam_post_id == 2){
			window.location.href = "https://ssccglpinnacle.com/product/SSC-CGL-Tier-2-Test-Package";
		}else{                               
			window.location.href = "https://ssccglpinnacle.com/product/Pinnacle-Test-Pass-";
		}
	}
	const handleEmailSubmit = async () => {
		let days = 365
		let expires = new Date()
		expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
		setCookie("email_id", EmailID, {
			path: "/",
			expires
		})
		setEmailShow(false)
		let std_details = [{ mobile, Otp, EmailID, FullName }]
		let product_buy_request = await fetch('http://localhost:5000/studentInfo', {      
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(std_details)
		})
		let product_buy_response = await product_buy_request.json();
		console.log(product_buy_response[0]['email_id'])
		if (product_buy_response[0]['email_id'] != '') {
			window.location.href = `https://ssccglpinnacle.com/product.php?email_id=${EmailID}`;
		}
	};

	/* useEffect(() => {
		async function emailResult(){
		let email = { 'email_id': cookies.email_id }
		let result = await fetch('http://localhost:5000/checkregistration', {    
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(email)
		})
		let email_result = await result.json()
		setRegistered(email_result['registered'])
	}

	emailResult()
	}, []) */

	const MobileFun = (e) => {
		setMobile(e.target.value)
	}

	const OtpFun = (e) => {
		setEnterOtp(e.target.value)
	}

	const startTest = event => {
		let exam_mode_id = event.target.getAttribute("exam_mode_id")
		let test_series_id = event.target.getAttribute("test_series_id")
		let papercode = event.target.getAttribute("paper_code")
		let test_title = event.target.getAttribute("title")
		navigate(`/Instruction/${btoa(exam_mode_id)}/${btoa(papercode)}/${btoa(test_series_id)}/${test_title}`);
	}
 
	const analysis = event => {
		let exam_mode_id = event.target.getAttribute("exam_mode_id")
		let test_series_id = event.target.getAttribute("test_series_id")
		let papercode = event.target.getAttribute("paper_code")
		let title = event.target.getAttribute("title")
		navigate(`/attempted/${btoa(exam_mode_id)}/${btoa(papercode)}/${btoa(test_series_id)}/${title}`);
	}

	const ResumeTest = async (event) => {
		let exam_mode_id = event.target.getAttribute("exam_mode_id")
		let test_series_id = event.target.getAttribute("test_series_id")
		let papercode = event.target.getAttribute("paper_code")
		let language = 'English'

		let qs_details = { 'email_id': cookies.email_id, 'paper_code': papercode, 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id }
		let res = await fetch('http://localhost:5000/pauseQuestion', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(qs_details)
		})
		let qsdt = await res.json()

		let paperids = qsdt.pause_question;

		navigate(`/test/${btoa(language)}/${btoa(papercode)}/${btoa(exam_mode_id)}/${btoa(test_series_id)}/${btoa(paperids)}`);
	}

	useEffect(() => {
		async function tierIds(){
		let tier_ids = { 'tier_id': exam_post_id }
		let res = await fetch('http://localhost:5000/Breadcrump', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tier_ids)
		})
		let tier = await res.json()
		setExamID(tier[0]['ExamId'])
		setPostTierName(tier[0]['PostTierId'])
	}              

	tierIds()
	}, [])

	const ValidationFun = () => {
		alert(`Please Enter Valid Mobile Number`)
	}

	return (
		<>
			{/* <TestSeriesHeader /> */}
			<TestOverview ExamID={ExamID} TierID={exam_post_id} TierName={TierName} exam_mode_id={exam_mode_id} test_series_id={testid} />
			<div className="float-left width-100-perc padding-top50">
				<div className="test-pass-container">
					<Row>
						{
							TestData.map((tdm, i) =>
								<>
									{tdm.Questions == '' ? '' :
										<Col md={4} className="margin-bottom30" key={i}>
											<div className="full-width float-left border-blue padding-9px-9px display-flex align-items-center">
												<div className="width-70-perc float-left">
													<p>{tdm.Title}</p>           
													<p><span className="margin-right10"><HiQuestionMarkCircle className="font-size-18 margin-right3 margin-top-minus3" />{tdm.Questions}</span> <span className="margin-right10"><AiOutlineFile className="font-size-18 margin-right3 margin-top-minus3" />{tdm.Marks}</span> <span>
														<BsClockFill className="font-size-18 margin-right3 margin-top-minus3" />{tdm.Time}</span></p>
												</div>                                                            
												<div className="width-30-perc float-left margin-center">
													{  tdm.start_date == '' ? TestAccess == 1 ?
														tdm.PaperStatus == 2 ? <button onClick={startTest} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Start Test</button> : tdm.PaperStatus == 1 ? <button onClick={analysis} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">View Result</button> : <button onClick={ResumeTest} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Resume Test</button>
														: CglAccess == 1 && exam_post_id == 2 ? tdm.PaperStatus == 2 ? <button onClick={startTest} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Start Test</button> : tdm.PaperStatus == 1 ? <button onClick={analysis} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">View Result</button> : <button onClick={ResumeTest} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Resume Test</button>
														: tdm.free_status == 0 ? tdm.PaperStatus == 2 ? <button onClick={startTest} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Start Test</button> : tdm.PaperStatus == 1 ? <button onClick={analysis} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">View Result</button> : <button onClick={ResumeTest} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Resume Test</button>
														:
														<button onClick={RegisteredStd == '0' ? handleShow : BuyFun} test_series_id={testid} exam_mode_id={tdm.exam_mode_id} paper_code={tdm.paper_code} title={tdm.Title} className="background-none border-9191ff color-9191ff br5-important">Unlock</button>
														: 
														<button className="background-none border-9191ff color-9191ff br5-important">Coming Soon</button>
													}      
												</div>
											</div>                   
											<div className="full-width float-left background-f1f1f1">
												{tdm.free_status == 0 ?
												<p className="padding-0px-9px">Syllabus | {tdm.languages} <span style={{ color: 'red', float: 'Right' }}> Free Mock </span> </p>
												:
												<p className="padding-0px-9px">Syllabus | {tdm.languages} {  tdm.start_date != '' ? <span className='date-time'> ({tdm.start_date}  {tdm.start_time}) </span> : '' } </p>
												}
												</div>
										</Col> 
									}           
								</>
							)
						}
					</Row>
				</div>
			</div>

			<Modal show={show} onHide={handleClose}>
				<div className='mobilebody'>
					<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Continue to Attempt</p>
					<p style={{ textAlign: 'center', fontSize: '13px' }}>Boost your exam preparation with us</p>
					<input type='number' placeholder='Enter Mobile Number' className='entermobile' onChange={MobileFun} />
				</div>
				<Button onClick={(mobile.length < 10 || mobile.length > 12) ? ValidationFun : handleOtp} className='continue-btn'>
					Continue
				</Button>
			</Modal>

			<Modal show={otpshow}>
				<div className='mobilebody'>
					<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Enter OTP</p>
					<p style={{ textAlign: 'center', fontSize: '13px' }}>Please enter the OTP sent to {mobile}</p>
					<input type='number' placeholder='Enter OTP' className='entermobile' onChange={OtpFun} />
				</div>
				<Button onClick={handleEmail} className='continue-btn'>
					Submit OTP
				</Button>
			</Modal>

			<Modal show={showEmail}>
				<div className='mobilebody'>
					<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600', marginTop: '4%', marginBottom: '1%' }}>Enter Your Name</p>
					<input type='text' placeholder='Enter Name' className='entermobile' onChange={(e) => setFullName(e.target.value)} />
					<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600', marginTop: '4%', marginBottom: '1%' }}>Enter Email ID</p>
					<input type='text' placeholder='Enter Email ID' className='entermobile' onChange={(e) => setEmailID(e.target.value)} />
				</div>
				<Button onClick={handleEmailSubmit} className='continue-btn'>
					Continue
				</Button>
			</Modal>

			{/* <TestSeriesFooter /> */}
		</>
	)
}

export default TestSeriesUnlock