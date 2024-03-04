// import './Header1.css'
import './TestSeries.css'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function TestOverview({ ExamID, TierID, TierName, exam_mode_id, test_series_id }) {
   const navigate = useNavigate()
   const [cookies, setCookie] = useCookies()
   const [TestAccess, setTestAccess] = useState()
   const [show, setShow] = useState(false);
   const [otpshow, setOtpShow] = useState(false);
   const [showEmail, setEmailShow] = useState(false);
   const [RegisteredStd, setRegistered] = useState();
   const [mobile, setMobile] = useState('')
   const [Otp, setOtp] = useState()
   const [EnterOtp, setEnterOtp] = useState()
   const [EmailID, setEmailID] = useState()
   const [FullTest, setFullTest] = useState(0)
   const [SectionalTest, setSectionalTest] = useState(0)
   const [ChapterTest, setChapterTest] = useState(0)
   const [PreviousTest, setPreviousTest] = useState(0)
   const [TestSeriesName, setTestSeriesName] = useState(0)
   const [FullName, setFullName] = useState()

   useEffect( () => {
      async function testName() {
      let test_name = { 'test_series_id': test_series_id }
      let test_series_request = await fetch("http://localhost:5000/testSeriesName", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(test_name)   
      });
      let test_series_response = await test_series_request.json();
      setTestSeriesName(test_series_response.test_series_name)
      }

      testName()
   }, [])

   useEffect( () => {
      async function freeTestDataWeb() {
      let free_test_data_web = { 'exam_post_tier_id': TierID }
      let free_test_data_web_request = await fetch("http://localhost:5000/teatDetails", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(free_test_data_web)
      })

      let free_test_data_web_response = await free_test_data_web_request.json();
      setFullTest(free_test_data_web_response.FullTest)
      setSectionalTest(free_test_data_web_response.SectionalTest)
      setChapterTest(free_test_data_web_response.ChapterTest)
      setPreviousTest(free_test_data_web_response.PreviousTest)
      }

      freeTestDataWeb()
   }, []);

   useEffect( () => {
      async function testAccess() {
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

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
/*    const handleOtp = async () => {
      setOtpShow(true);
      setShow(false);
      let otp_data = { 'mobile': mobile, 'name': 'Student' }
      let otp_request = await fetch("http://localhost:5000/otp", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
         },
         body: JSON.stringify(otp_data)
      });
      let otp_response = await otp_request.json();
      setOtp(otp_response.OTP)
   } */

   const handleEmail = () => {
      if (EnterOtp == Otp) {
         setOtpShow(false)
         setEmailShow(true);
      } else {
         alert('Please enter the OTP sent to ' + mobile)
      }
   }

   const BuyFun = () => {
      window.location.href = "https://ssccglpinnacle.com/product/Pinnacle-Test-Pass-";
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
      if (product_buy_response[0]['email_id'] != '') {
         window.location.href = `https://ssccglpinnacle.com/product.php?email_id=${EmailID}`;
      }
   };

   const MobileFun = (e) => {
      setMobile(e.target.value)
   }

   const OtpFun = (e) => {
      setEnterOtp(e.target.value)
   }

  /*  useEffect(async () => {
      let email = { 'email_id': cookies.email_id }
      let result = await fetch('http://localhost:5000/checkregistration', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
         },
         body: JSON.stringify(email)
      })
      let email_result = await result.json()
      setRegistered(0)
   }, []) */

   const HomeFun = () => {
      window.location.href = "https://ssccglpinnacle.com";
   }

   const TestSeriesFun = () => {
      if (cookies.email_id == undefined || cookies.email_id == 'undefined') {
         navigate(`/`)
      } else {
         navigate(`/testseries/${cookies.email_id}`)
      }
   }
   const ExamFun = () => {
      navigate(`/CategoryExam/${ExamID}`)
   }
   const ExamTietFun = () => {
      navigate(`/TestSeriesSingle/${TierID}`)
   }
   const TestseriesListFun = () => {
      navigate(`/TestseriesList/${exam_mode_id}/${TierID}`)
   }

   const ValidationFun = () => {
      alert(`Please Enter Valid Mobile Number`)
   }
   return (
      <>
         <div className="section-first-category-exam-page font-size12 margin-top10 margin-bottom10">
            <div className="test-pass-container">
               <ul className="breadcrumb">
                  <li className="secondary" onClick={HomeFun} style={{ cursor: 'pointer' }}>Home</li>
                  <li className="secondary" onClick={TestSeriesFun} style={{ cursor: 'pointer' }}>Test Series</li>
                  <li className="secondary" onClick={ExamFun} style={{ cursor: 'pointer' }}>{ExamID == 1 ? 'SSC' : ExamID == 2 ? 'Delhi Police' : 'Railway'}</li>
                  <li className="secondary" onClick={ExamTietFun} style={{ cursor: 'pointer' }}>{TierName}</li>
                  {
                     exam_mode_id && <li className="secondary" onClick={TestseriesListFun} style={{ cursor: 'pointer' }}>{exam_mode_id == 1 ? 'Full Test' : exam_mode_id == 2 ? 'Sectional Test' : exam_mode_id == 3 ? 'Chapter Wise Test' : exam_mode_id == 4 ? 'PYP Test' : ''}</li>
                  }
                  {
                     TestSeriesName && <li className="gray">{TestSeriesName}</li>
                  }
               </ul>
            </div>
         </div>
         <div className="full-width bg-skyblue div-padding2025">
            <div className="test-pass-container">
               <h5 className="center-align">{TierName}: India's most comprehensive Test Series</h5>
               <p className="center-align">Full length Mock tests | PYP TCS | Sectional Tests | Chapter wise Test</p>
               <Row className="margin-center">
                  <Col md={5} style={{ padding: '0px', fontSize: '14px' }}>
                     <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                        <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                     </svg>
                     <p>{FullTest == 0 ? '' : FullTest + ' Full Test,'} {SectionalTest == 0 ? '' : SectionalTest + ' Sectional Test,'}{ChapterTest == 0 ? '' : ChapterTest + ' Chapter Wise Test,'} {PreviousTest == 0 ? '' : PreviousTest + ' PYP Test '} </p>
                  </Col>
                  <Col md={4} style={{ padding: '0px', fontSize: '14px' }}>
                     <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                        <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                     </svg>
                     <p>Test Series Available in Hindi & English</p>
                  </Col>
                  <Col md={3} style={{ padding: '0px', fontSize: '14px' }}>
                     <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                        <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                     </svg>
                     <p>Paper Solutions by CGL Experts</p>
                  </Col>
               </Row>
               <div className="wd50 margin-center center-align fln">
                  {
                     TestAccess == 1 ? '' : <button className="unlock-button br2 unlock-button-padding wd50" onClick={RegisteredStd == '0' ? handleShow : BuyFun}>
                        Unlock all exams
                     </button>
                  }
               </div>
            </div>
         </div>

         <Modal show={show} onHide={handleClose}>
            <div className='mobilebody'>
               <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Continue to Attempt</p>
               <p style={{ textAlign: 'center', fontSize: '13px' }}>Boost your exam preparation with us</p>
               <input type='number' placeholder='Enter Mobile Number' className='entermobile' onChange={MobileFun} />
            </div>
            {/* <Button onClick={(mobile.length < 10 || mobile.length > 12) ? ValidationFun : handleOtp} className='continue-btn'>
               Continue
            </Button> */}     
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
      </>
   )
}

export default TestOverview