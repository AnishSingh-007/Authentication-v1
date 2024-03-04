import './header1.css'
import './TestSeries.css'
import { Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function SpecificTestseries(props) {
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const [TestSeriesData, setTestSeriesData] = useState([])
  const tranding_icon = 'https://ssccglpinnacle.com/myaccount/images/trending-icon.png'
  const total_test = 'TOTAL TESTS'  
  const free_test = 'FREE TESTS'    

  useEffect( () => {                    
    async function testSeriesData(){
    let testseries_data = { 'email_id': cookies.email_id, 'exam_mode_id': props.exam_mode_id, 'exam_post_id': props.exam_post_id }
    let testseries_data_request = await fetch("http://localhost:5000/TestSeries", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },    
      body: JSON.stringify(testseries_data)
    });
    let testseries_data_request_response = await testseries_data_request.json();
    setTestSeriesData(testseries_data_request_response)
  }

  testSeriesData()
  }, [])
                                                    
  const testUnlock = event => {             
    let testid = event.target.getAttribute("test-series-id"); 
    if(props.exam_post_id == 2 && props.exam_mode_id == 1){
      navigate(`/TestSeriesUnlockSection/${testid}/${props.exam_post_id}/${props.exam_mode_id}`)
    }else if(props.exam_post_id == 4 && props.exam_mode_id == 1){
      navigate(`/TestSeriesUnlockSection/${testid}/${props.exam_post_id}/${props.exam_mode_id}`)
    }else if(props.exam_post_id == 4 && props.exam_mode_id == 5){  
      navigate(`/TestSeriesUnlockSection/${testid}/${props.exam_post_id}/${props.exam_mode_id}`)
    }else if(props.exam_post_id == 2 && props.exam_mode_id == 5){
      navigate(`/TestSeriesUnlockSection/${testid}/${props.exam_post_id}/${props.exam_mode_id}`)
    }else if(props.exam_post_id == 11 && props.exam_mode_id == 1){
      navigate(`/TestSeriesUnlockSection/${testid}/${props.exam_post_id}/${props.exam_mode_id}`)
    }else{
      navigate(`/TestSeriesUnlock/${testid}/${props.exam_post_id}/${props.exam_mode_id}`)
    }
  }                       
                   
  return (
    <>
      <div className="float-left width-100-perc padding-top10">
        <div className="test-pass-container">
          <Row>
            {   
              TestSeriesData.map((stsdm, i) =>
                <>                            
                  <Col md={3} className="br2 width-24-perc margin-right1-percent background-image-ffb2b247 padding-bottom20 margin-bottom30 mobile-width100">
                    <div className="float-left width-100-perc margin-top10 margin-bottom10">          
                      <img className="float-left width-30-perc max-width50" src={stsdm.exam_logo} alt="testseries" />
                      <div className="width-70-perc float-left background-color-white-important padding-3px-6px width-auto-important br5 margin-top10 margin-left10">
                        <img className="width20 float-left" src={tranding_icon} alt="tracking-image" />
                        <span className="margin-left10 margin-top0 float-left">Students</span>
                      </div>
                    </div>    
                    <div>   
                      <p>{stsdm.test_series_name}</p>
                      <p><span>{stsdm.total_test} {total_test}</span> | <span>{stsdm.free_total_test} {free_test}</span></p>
                    </div>
                    <div>
                      <button onClick={testUnlock} test-series-id={stsdm.test_series_id} className="margin-center padding-3px-11px outline-none border-none display-block color-white background-color-03519c border-color-007bff">View Test Series</button>
                    </div>
                  </Col>
                </>
              )
            }
          </Row>
        </div>
      </div>
    </>
  )
}

export default SpecificTestseries