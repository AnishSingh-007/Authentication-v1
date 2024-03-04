
import './header1.css'
import './TestSeries.css'
import { Row, Col, Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import TestOverview from './TestOverview'
import TestTimer from './TestTimer'
import { useNavigate } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams } from 'react-router'
// import TestSeriesHeader from './TestSeriesHeader'
// import TestSeriesFooter from './TestSeriesFooter'
import GoToTop from './GoToTop'
import { FaArrowRight } from "react-icons/fa"
import { useCookies } from 'react-cookie'

function TestSeriesSingle() {
   const [cookies] = useCookies()
   const navigate = useNavigate()
   const { tier_id } = useParams()
   const [OtherTestDataWeb, setFreeTestDataWeb] = useState([])
   const [RelatedTestDataWeb, setRelatedTestDataWeb] = useState([])
   const [LiveTestData, setLiveTestData] = useState([])
   const [UpcommingTestData, seUpcommingTestData] = useState([])
   const [ExpiredTestData, setExpiredTestData] = useState([])
   const [mobile, setMobile] = useState('')
   const [Otp, setOtp] = useState()
   const [EnterOtp, setEnterOtp] = useState()
   const [TestType, setTestType] = useState('Register')
   const [EmailID, setEmailID] = useState()
   const [TestSeriesId, setTestSeriesId] = useState()
   const [ExamModeId, setExamModeId] = useState()
   const [paper_code, setPaperCode] = useState()
   const [RegisteredStd, setRegisteredStd] = useState()
   const [RegisteredUser, setRegisteredUser] = useState()
   const [RegisteredType, setRegisteredType] = useState('Register')
   const [UpcommingRegistered, setUpcommingRegistered] = useState('Register')
   const [UpcomingRegisteredStd, setUpcomingRegisteredStd] = useState()
   const [UpcomingRegisteredUser, setUpcomingRegisteredUser] = useState()
   const [TestAccess, setTestAccess] = useState()
   const [show, setShow] = useState(false);
   const [otpshow, setOtpShow] = useState(false);
   const [showEmail, setEmailShow] = useState(false);
   const [TierName, setPostTierName] = useState()
   const [ExamID, setExamID] = useState()
   const [FullName, setFullName] = useState()

   const responsive = {
      superLargeDesktop: {
         breakpoint: { max: 4000, min: 3000 },
         items: 5
      },
      desktop: {
         breakpoint: { max: 3000, min: 1024 },
         items: 3
      },
      tablet: {
         breakpoint: { max: 1024, min: 464 },
         items: 2
      },
      mobile: {
         breakpoint: { max: 464, min: 0 },
         items: 1
      }
   }

   useEffect(() => {
      async function freeTestDataWeb(){     
      let free_test_data_web = [{ 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_post_tier_id': 1 }]
      let free_test_data_web_request = await fetch("http://localhost:5000/NewTestsWeb", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(free_test_data_web)
      });
      let free_test_data_web_response = await free_test_data_web_request.json();
      console.log(free_test_data_web_response)
      setFreeTestDataWeb(free_test_data_web_response)
   }

   freeTestDataWeb()
   }, [])

   const testSeriesList = event => {
      let exam_mode_id = event.target.getAttribute("exam_mode_id");
      let exam_post_id = event.target.getAttribute("exam_post_tier");

      navigate('/TestseriesList/' + exam_mode_id + '/' + exam_post_id);
   }
      
   useEffect(() => {
      async function relatedTestDataWeb(){
      let related_test_data_web = [{ 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_post_tier_id': 1 }]
      let related_test_data_web_request = await fetch("http://localhost:5000/RelatedExam", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(related_test_data_web)
      });
      let related_test_data_web_response = await related_test_data_web_request.json();
      console.log(related_test_data_web_response)
      setRelatedTestDataWeb(related_test_data_web_response)
   }

   relatedTestDataWeb()
   }, [])

   function viewAll(e) {
      let tier_id = e.target.dataset.tier
      navigate('/TestSeriesSingle/' + 1)
   }

   async function postTier(e) {
      let tier_id = e.target.dataset.tier
      navigate('/TestSeriesSingle/' + 1)
   }

/*    async function clearTimer(e) {
      let live_test_email_id = [{ 'email_id': 'neerajit@ssccglpinnacle.com' }]
      let live_test_request = await fetch("http://localhost:5000/MegaMockChallengeTest", {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(live_test_email_id)
      });
      let live_test_response = await live_test_request.json();
      if (live_test_response[0]['LiveTests'] != '') {
         setLiveTestData(live_test_response[0]['LiveTests'])
         setTestSeriesId(live_test_response[0]['LiveTests'][0]['test_series_id'])
         setExamModeId(live_test_response[0]['LiveTests'][0]['exam_mode_id'])
         setPaperCode(live_test_response[0]['LiveTests'][0]['paper_code'])

         if (live_test_response[0]['LiveTests'][0]['left_days'] == 'live') {
            setTestType('Start Test')
         }
         seUpcommingTestData(live_test_response[0]['UpcommingTests'])
         setExpiredTestData(live_test_response[0]['ExpiredTests'])

         setRegisteredStd(live_test_response[0]['LiveTests'][0]['registered_std'])
         setRegisteredUser(live_test_response[0]['LiveTests'][0]['registered_user'])
      }
      if (live_test_response[0]['UpcommingTests'] != '') {
         setUpcomingRegisteredStd(live_test_response[0]['UpcommingTests'][0]['registered_std'])
         setUpcomingRegisteredUser(live_test_response[0]['UpcommingTests'][0]['registered_user'])
      }
   }

   useEffect(() => {
      clearTimer();
   }, []);
 */
   const handleUser = async (e) => {
      /* let paper_code = (e.target.value)
      let std_details = [{ mobile, Otp, EmailID, TestSeriesId, ExamModeId, paper_code }]
      await fetch('http://localhost:5000/studentInfo', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(std_details)
      }) */

      setRegisteredType('Registered')
   }

   const handleUpcomingUser = async (e) => {
      /* let paper_code = (e.target.value)
      let std_details = [{ mobile, Otp, 'EmailID': cookies.email_id, TestSeriesId, ExamModeId, paper_code, FullName }]
      await fetch('http://localhost:5000/studentInfo', {
         method: 'POST',
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(std_details)
      }) */

      setUpcommingRegistered('Registered')
   }    

   const handleClose = () => setShow(false);
   const handleShow = (e) => {
      setShow(true)
      setPaperCode(e.target.getAttribute('value'))
   }
 
   /* const handleOtp = async() => {
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
      setEmailShow(false)
      let std_details = [{ mobile, Otp, EmailID, TestSeriesId, ExamModeId, paper_code }]
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
      setRegisteredType('Registered')
   };

   const MobileFun = (e) => {
      setMobile(e.target.value)
   }

   const OtpFun = (e) => {
      setEnterOtp(e.target.value)
   }

   const setTest = (tst) => {
      setTestType(tst)
   }

   const startTest = (event) => {
      let test_title = event.target.getAttribute("test_title")
      navigate(`/Instruction/${btoa(ExamModeId)}/${btoa(paper_code)}/${btoa(TestSeriesId)}/${btoa(test_title)}`);
   }

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

 /*   useEffect(async () => { 
      let tier_ids = { 'tier_id': 1 }
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
   }, []) */

   const ValidationFun = () => {
      alert(`Please Enter Valid Mobile Number`)
   }
    
   return (
      <>
         {/* <TestSeriesHeader /> */}
         {/* <TestOverview ExamID={ExamID} TierID={tier_id} TierName={TierName} /> */}
         {
            OtherTestDataWeb.filter(tid => tid.ExamPostTier == tier_id).map((otdw, i) =>

               <div className="full-width div-padding" key={i}>
                  <div className="test-pass-container">
                     <h2 className="recommended-heading">{otdw.ExamPost}</h2>
                     <div className="main-div">
                        <Row>
                           {
                              otdw.TestType.map((omtmm, j) =>

                                 omtmm.TotalTests == 0 ? '' :
                                    <>
                                       <Col md={3} key={j}>
                                          <div className="alltestseries-exam-category-div full-width div-padding" exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier} onClick={testSeriesList}>
                                             <h6 className="left-algn full-width" style={{ fontWeight: 'bold' }} exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>{omtmm.test_type}
                                             </h6>
                                             <p className="left-algn full-width" exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>{omtmm.TotalTests} Total Tests | {omtmm.FreeTests} Free Test</p>
                                             <div className="left-right full-width" style={{ fontSize: '14px' }} exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>
                                                <span exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>Total Test Series</span>
                                                <span exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>{omtmm.TotalTestSeries}</span>
                                             </div>
                                             <div className="bottom-line"> </div>
                                             <div className="full-width attempt" exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>
                                                Continue
                                                {/* <FaArrowRight /> */}
                                             </div>
                                          </div>
                                       </Col>
                                    </>
                              )}
                        </Row>
                     </div>
                  </div>
               </div>
            )
         }

         {
            OtherTestDataWeb.filter(tid => tid.ExamPostTier != tier_id).map((otdw, i) =>

               <div className="full-width div-padding" key={i}>
                  <div className="test-pass-container">
                     <h2 className="recommended-heading">{otdw.ExamPost}</h2>
                     <div className="main-div">
                        <Row>
                           {
                              otdw.TestType.map((omtmm, j) =>

                                 omtmm.TotalTests == 0 ? '' :
                                    <>
                                       <Col md={3}>
                                          <div className="alltestseries-exam-category-div full-width div-padding" exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier} onClick={testSeriesList}>
                                             <h6 className="left-algn full-width" style={{ fontWeight: 'bold' }} exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>{omtmm.test_type}
                                             </h6>
                                             <p className="left-algn full-width" exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>{omtmm.TotalTests} Total Tests | {omtmm.FreeTests} Free Test</p>
                                             <div className="left-right full-width" style={{ fontSize: '14px' }} exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>
                                                <span exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>Total Test Series</span>
                                                <span exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>{omtmm.TotalTestSeries}</span>
                                             </div>

                                             <div className="bottom-line"> </div>
                                             <div className="full-width attempt" exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>
                                                <span exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}>Continue</span>
                                                {/* <span exam_mode_id={omtmm.exam_mode_id} exam_post_tier={otdw.ExamPostTier}><FaArrowRight /></span> */}
                                             </div>
                                          </div>
                                       </Col>
                                    </>
                              )}
                        </Row>
                     </div>
                  </div>
               </div>
            )
         }

         <div className="bg-skyblue full-width div-padding">
            <div className="test-pass-container">
               <Row>
                  <Col md={6} className="center-align">
                     <Row>
                        <Col md={12}>
                           <img src="https://grdp.co/cdn-cgi/image/width=176,height=156,quality=100,f=auto/https://gs-post-images.grdp.co/2021/8/group-4-2x-img1629278264534-38.png-rs-high-webp.png" />
                           <p>Aaj ka Champion kaun</p>
                           <p>All India Live Mock Test</p>
                        </Col>
                        <Col md={12}>
                           <Row>
                              <Col md={3} className="margin-center right-border center-align fnt13">
                                 <svg className="bg-secondary bg-width center-align margin-center fln" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533"><path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134"></path></svg>
                                 <span className="full-width center-align">Latest TCS Pattern</span>
                              </Col>
                              <Col md={3} className="margin-center right-border center-align fnt13">
                                 <svg className="bg-secondary bg-width center-align margin-center fln" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533"><path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134"></path></svg>
                                 <span className="full-width center-align">Real Exam exposure</span>
                              </Col>
                              <Col md={3} className="margin-center right-border center-align fnt13">
                                 <svg className="bg-secondary bg-width center-align margin-center fln" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533"><path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134"></path></svg>
                                 <span className="full-width center-align">Compete with thousands of students</span>
                              </Col>
                              <Col md={3} className="margin-center center-align fnt13">
                                 <svg className="bg-secondary bg-width center-align margin-center fln" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533"><path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134"></path></svg>
                                 <span className="full-width center-align">Detailed performance analysis</span>
                              </Col>
                           </Row>
                        </Col>
                     </Row>
                  </Col>
                  <Col md={6}>
                     {
                        LiveTestData.map((livetst, l) =>
                           <>
                              <div className="alltestseries-exam-category-div full-width margin-center div-padding wd80 ml10" key={l}>
                                 <img className="exam-category-img" src="https://ssccglpinnacle.com/images/ssc-logo.png" />
                                 <h5 className="center-align full-width">{livetst.test_title}</h5>
                                 <Row className="full-width">
                                    <Col md={4} className="no-padding">
                                       <p className="right-border">{livetst.TotalQuestions} Questions</p>
                                    </Col>
                                    <Col md={4} className="no-padding">
                                       <p className="right-border">{livetst.TotalMarks} Marks</p>
                                    </Col>
                                    <Col md={4}>
                                       <p className="right-border">{livetst.TotalTime} Minutes</p>
                                    </Col>
                                 </Row>
                                 <Row className="full-width margin-left0 margin-right0 rb3">
                                    {TestType == 'Start Test' || livetst.left_days == 'live' ? <Col md={12} className="right-border liveclass">
                                       <p className="margin-bottom0">Test is Live now</p>
                                    </Col> : RegisteredStd == '1' && RegisteredUser == '1' ? <Col md={12} className="right-border">
                                       <p className="margin-bottom0" style={{ fontSize: '13px', marginTop: '2%' }}>Starts In</p>
                                       <p style={{ fontWeight: '600' }}>{livetst.left_days == '24' ? <TestTimer hours={livetst.hours} mins={livetst.minutes} secs={livetst.seconds} setTest={setTest} /> : livetst.left_days == 'live' ? 'Live' : livetst.left_days}</p>
                                    </Col> :
                                       <>
                                          <Col md={6} className="right-border">
                                             <p className="margin-bottom0">Starts On</p>
                                             <p>{livetst.start_date}</p>
                                          </Col>
                                          <Col md={6}>
                                             <p style={{ margin: '0' }}>Time Left</p>
                                             <p>{livetst.left_days == '24' ? <TestTimer hours={livetst.hours} mins={livetst.minutes} secs={livetst.seconds} setTest={setTest} /> : livetst.left_days == 'live' ? 'Live' : livetst.left_days + ' to go'}</p>
                                          </Col>
                                       </>
                                    }
                                 </Row>
                                 <div className="full-width">
                                    {
                                       livetst.left_days == 'live' ? <button className="unlock-button unlock-button-padding full-width width100 no-padding no-mrlt" test_title={livetst.test_title} onClick={startTest}>Start Test</button> : RegisteredStd == '1' && RegisteredUser == '1' ? <button className="unlock-button unlock-button-padding full-width width100 no-padding no-mrlt reg-user">Registered</button> : RegisteredStd == '1' && RegisteredUser == '0' ? <button className="unlock-button unlock-button-padding full-width width100 no-padding no-mrlt" value={livetst.paper_code} onClick={handleUser}>{RegisteredType}</button> : <button className="unlock-button unlock-button-padding full-width width100 no-padding no-mrlt" onClick={handleShow}>{RegisteredType}</button>
                                    }
                                 </div>
                              </div>
                           </>
                        )}
                  </Col>
               </Row>
            </div>
         </div>

         {
            UpcommingTestData == '' ? '' :
               <div className="section-first-category-exam-page">
                  <div className="test-pass-container">
                     <div className="margin-upper full-width">
                        <h2 className="recommended-heading">Upcoming Mega Mock Challenge</h2>
                        <div className="main-div">
                           <div className="scroller-button top34-percent transform0"><svg id="arrow-ios-forward-outline" width="10.589" height="21.047" viewBox="0 0 10.589 21.047"><path id="arrow-ios-forward-outline-2" data-name="arrow-ios-forward-outline" d="M15,28.5a1.5,1.5,0,0,1-1.155-2.46L20.565,18l-6.48-8.055A1.533,1.533,0,1,1,16.5,8.055l7.245,9a1.5,1.5,0,0,1,0,1.905l-7.5,9A1.5,1.5,0,0,1,15,28.5Z" transform="translate(-13.497 -7.456)" fill="#ed5f69"></path></svg></div>
                           <Row className="main-div-scroller" style={{ width: '100%' }}>
                              {
                                 UpcommingTestData && UpcommingTestData.map((fdm, x) =>
                                    <>
                                       <Col md={4} key={x}>
                                          <div className="alltestseries-exam-category-div full-width div-padding">
                                             <h6 className="left-algn full-width" style={{ fontWeight: '600' }}>{fdm.test_title}</h6>
                                             <p className="left-algn full-width" style={{ fontSize: '14px' }}>Starts on {fdm.start_date}</p>
                                             <div className="left-right full-width">
                                                <span>8800+ users have already registered</span>
                                             </div>
                                             <div className="bottom-line"> </div>
                                             {
                                                UpcomingRegisteredStd == '1' && UpcomingRegisteredUser == '1' ? <div className="full-width attempt">
                                                   <span>Registered</span>
                                                </div> : UpcomingRegisteredStd == '1' && UpcomingRegisteredUser == '0' ? <button value={fdm.paper_code} onClick={handleUpcomingUser} className="full-width attempt">
                                                   {UpcommingRegistered}
                                                   <span style={{ fontSize: '12px' }} value={fdm.paper_code}><FaArrowRight /></span>
                                                </button> : <div className="full-width attempt" value={fdm.paper_code} onClick={handleShow}>
                                                   {RegisteredType}
                                                </div>
                                             }
                                          </div>
                                       </Col>
                                    </>
                                 )}
                           </Row>
                        </div>
                     </div>
                  </div>
               </div>
         }

         {
            ExpiredTestData == '' ? '' :
               <div className="section-first-category-exam-page">
                  <div className="test-pass-container">
                     <div className="margin-upper full-width">
                        <h2 className="recommended-heading">Expired Mega Mock Challenge</h2>
                        <Row className="main-div-scroller" style={{ width: '100%' }}>
                           <Carousel responsive={responsive} autoPlay='false' autoPlaySpeed={100000000}>
                              {
                                 ExpiredTestData && ExpiredTestData.map((exp, ex) =>
                                    <Col md={12} style={{ padding: "17px" }} key={ex}>
                                       <div className="alltestseries-exam-category-div full-width div-padding">
                                          <h6 className="left-algn full-width" style={{ fontWeight: '600' }}>{exp.test_title}</h6>
                                          <p className="left-algn full-width" style={{ fontSize: '14px' }}>Expired on {exp.expiry_date}</p>
                                          <div className="left-right full-width">
                                             <span>8800+ users have already registered</span>
                                          </div>
                                          <div className="bottom-line"> </div>
                                          <div className="full-width attempt">
                                             <span style={{ color: 'gray', fontWeight: '600' }}>Expired</span>
                                          </div>
                                       </div>
                                    </Col>
                                 )}
                           </Carousel>
                        </Row>
                     </div>
                  </div>
               </div>
         }

         <div className="full-width mt55 margin-bottom20">
            <div className="test-pass-container">
               <Row>
                  <Col md={8} className="no-padding">
                     <Row>
                        <Col md={10} className="no-padding">
                           <h2 className="recommended-heading">Other Exams</h2>
                           <p className="recommended-exam-p">View Test series of other exams in the test pass</p>
                        </Col>
                        <Col md={2}>
                           <p onClick={viewAll} data-tier={tier_id} style={{ cursor: "pointer" }} className="recomended-viewall secondary">View All</p>
                        </Col>
                     </Row>
                     <div className="main-div">
                        <Row className="main-div-scroller">
                           {
                              RelatedTestDataWeb.map((rtdm, o) =>
                                 <Col md={4} key={o}>
                                    <div className="alltestseries-exam-category-div full-width" data-tier={rtdm.exam_post_tier_id} onClick={postTier}>
                                       <img className="exam-category-img" data-tier={rtdm.exam_post_tier_id} src={rtdm.logo} />
                                       <p className="exam-category-p" data-tier={rtdm.exam_post_tier_id}>{rtdm.post_name}</p>
                                    </div>
                                 </Col>
                              )}
                        </Row>
                        <Row>
                           {
                              TestAccess == 1 ? '' : <button className="unlock-button unlock-button-padding unlock-width" onClick={RegisteredStd == '0' ? handleShow : BuyFun}>
                                 Unlock all exams
                              </button>
                           }
                        </Row>
                     </div>
                  </Col>
                  <Col md={4}>
                     <div className="bg-background">
                        <p className="category-yearly-test-pass">Buy Yearly test pass to unlock all SSC exams tests: 1000+ tests</p>
                        <Row>
                           <Col md={6} className="no-padding">
                              <div className="full-width">
                                 <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                                    <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                                 </svg>
                                 <p className="p-color p-size">Latest TCS Pattern</p>
                              </div>
                              <div className="full-width">
                                 <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                                    <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                                 </svg>
                                 <p className="p-color p-size">Comprehensive test series</p>
                              </div>
                              <div className="full-width">
                                 <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                                    <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                                 </svg>
                                 <p className="p-color p-size">Exam Oriented Solution</p>
                              </div>
                              <div className="full-width">
                                 <svg className="bg-secondary bg-width" xmlns="http://www.w3.org/2000/svg" width="20.133" height="20.533" viewBox="0 0 20.133 20.533">
                                    <path id="ios-checkmark-circle" d="M13.442,3.375A10.166,10.166,0,0,0,3.375,13.642,10.166,10.166,0,0,0,13.442,23.908,10.166,10.166,0,0,0,23.508,13.642,10.166,10.166,0,0,0,13.442,3.375ZM18.6,10.8l-6.47,6.629h0a.867.867,0,0,1-.562.272.842.842,0,0,1-.566-.281L8.282,14.658a.2.2,0,0,1,0-.281l.862-.879a.185.185,0,0,1,.271,0l2.149,2.192,5.9-6.066a.19.19,0,0,1,.136-.059.175.175,0,0,1,.136.059l.847.894A.2.2,0,0,1,18.6,10.8Z" transform="translate(-3.375 -3.375)" fill="#e71134" />
                                 </svg>
                                 <p className="p-color p-size">Detailed Analysis</p>
                              </div>
                           </Col>
                           <Col md={6}>
                              <img src="https://ssccglpinnacle.com/images/Group 36.png" />
                           </Col>
                        </Row>
                        {
                           TestAccess == 1 ? '' : <button className="unlock-button unlock-button-padding" onClick={RegisteredStd == '0' ? handleShow : BuyFun}>
                              Unlock all exams
                           </button>
                        }
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
         <GoToTop />

         <Modal show={show} onHide={handleClose}>
            <div className='mobilebody'>
               <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Continue to purchase</p>
               <p style={{ textAlign: 'center', fontSize: '13px' }}>Boost your exam preparation with us</p>
               <input type='number' placeholder='Enter Mobile Number' className='entermobile' onChange={MobileFun} />
            </div>
            <Button onClick={(mobile.length < 10 || mobile.length > 12) ? ValidationFun : '' } className='continue-btn'>
               Continue
            </Button>
         </Modal>

         <Modal show={otpshow}>
            <div className='mobilebody'>
               <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Enter OTP</p>
               <p style={{ textAlign: 'center', fontSize: '13px' }}>Please enter the OTP sent to {mobile} </p>
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
   );
}
export default TestSeriesSingle

