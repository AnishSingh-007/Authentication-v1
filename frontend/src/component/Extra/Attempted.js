import './Attempted.css'
import './mobilestyle.css' 
import logo from '../images/Bubble-Preloader.gif';
import { Row, Col, Container } from "react-bootstrap"
import ReactStars from "react-rating-stars-component";
import { FaPercent, FaFileAlt, FaRegStar, FaUserCircle, FaExclamationCircle } from "react-icons/fa";
import { BsTrophy } from "react-icons/bs";
import { SiApplepodcasts } from "react-icons/si";
import { Line } from 'react-chartjs-2';
import React, { Fragment, useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router'
import { useCookies } from 'react-cookie'
               
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Attempted = () => {
    const [cookies] = useCookies()         
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [totalMark, setTotalmarks] = useState()
    const [label, setLabel] = useState([])
    const [graphdata, setGraphData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [cutoff, setCutoff] = useState();
    const { exam_mode_id, paper_code, test_series_id, title } = useParams()
    const exam_mode_ids = atob(exam_mode_id)
    const papercode = atob(paper_code)
    const testseriesid = atob(test_series_id)
    const testtitle = title
    const [SubjectID,setSubjectID] = useState()

    const ratingChanged = async (newRating) => {
        let rating_data = { 'paper_code': papercode, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_ids, 'test_series_id': testseriesid, 'rating': newRating }
        await fetch("http://localhost:5000/rating", {      
            method: 'POST',
            headers: {   
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rating_data)    
        });
    }

    useEffect(() => {
        async function paperDetails(){
        let paper_details = { 'paper_code': papercode, 'email_id': 'neerajit@ssccglpinnacle.com', 'exam_mode_id': exam_mode_ids, 'test_series_id': testseriesid }
        let answers_result = await fetch("http://localhost:5000/attempted", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paper_details)
        });
        answers_result = await answers_result.json();
        setData(answers_result)
        setTotalmarks(answers_result[0]['TotalMarks'])
        setLabel(answers_result[0]['graph'][0]['label'])
        setGraphData(answers_result[0]['graph'][0]['data'])
        setCutoff(answers_result[0].obc)
        setSubjectID(answers_result[0].Subjects[0]['subject_id'])
        setLoading(false)
        }

        paperDetails()
    }, [])
   
    const marks_distribution = {
        labels: label,
        datasets: [
            {
                label: 'Students',
                fill: false,
                lineTension: 0.0,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: graphdata
            }
        ]
    }
 
    const GOtoSolution = () => {
        navigate(`/solution/${btoa(exam_mode_ids)}/${btoa(papercode)}/${btoa(testseriesid)}/${testtitle}/${btoa(SubjectID)}`);
    }
 
    const CutoffFuction = (e) => {
        setCutoff(e.target.value)
    }

    const GoToTestFun = () =>{
        navigate(`/testseries/${cookies.email_id}`);
    }

    return (
        <>
            <div className='MyContainer'>
                <Row className='section1 mobile-row'>
                    <Col md={1} className='mobile-display-none' style={{padding:'0'}}>
                        <img src="https://ssccglpinnacle.com/images/pinnacle_logo.png" alt="logo" />
                    </Col>
                    <Col md={5}>
                        <p className='test-title mobile-fontsize15'>{testtitle} </p>
                    </Col>
                    <Col md={3} className='rating_area mobile-display-none'>
                        <p className='rate-title'>
                            Rate the Test
                        </p>
                        <p className='rate-test'>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={30}
                                activeColor="#ffd700"
                            />
                        </p>
                    </Col>
                    <Col md={2} className='mobile-display-none'>
                        <button className='gtt' onClick={GoToTestFun}>Go To Tests</button>
                        <button className='go-sol' onClick={GOtoSolution}>Solution</button>
                    </Col>
                </Row>
                <div className='section2'>
                    <Container className='mobile-container95 mobile-padding0'>
                        <Row className='mobile-width100-perc mobile-margin0 mobile-row'>
                            <Col>
                                <h5 className='performance-title'>Overall Performance Summary</h5>
                            </Col>
                        </Row>     
                        {
                            isLoading ? <h3 style={{ textAlign: "center" }}><img src={logo} alt="loading..." /></h3> : data.map((item, i) =>
                                <Fragment key={i}>
                                    <Row className='performance-div mobile-height-auto-important mobile-float-left mobile-width100 mobile-row'>
                                        <Col md={3} className='performance-icon mobile-width50-perc mobile-margin-bottom12 mobile-margin-top12'>
                                            <div className='rank-icon'><FaRegStar /></div>
                                            <div className='title-div'>
                                                <p>{item.Rank} <span>/ {item.TotalStudent}</span></p>
                                                <p className='help-text'>Rank</p>
                                            </div>
                                        </Col>
                                        <Col md={3} className='performance-icon mobile-width50-perc mobile-margin-bottom12 mobile-margin-top12'>
                                            <div className='trophy-icon'><BsTrophy /></div>
                                            <div className='title-div'>
                                                <p>{item.Score} <span>/ {item.TotalMarks}</span></p>
                                                <p className='help-text'>Score</p>
                                            </div>
                                        </Col>
                                        <Col md={2} className='performance-icon mobile-width50-perc mobile-margin-bottom12 mobile-margin-top12'>
                                            <div className='attempted-icon'><FaFileAlt /></div>
                                            <div className='title-div'>
                                                <p>{item.Attempted} <span>/ {item.TotalQuestions}</span></p>
                                                <p className='help-text'>Attempted</p>
                                            </div>
                                        </Col>
                                        <Col md={2} className='performance-icon mobile-width50-perc mobile-margin-bottom12 mobile-margin-top12'>
                                            <div className='accuracy-icon'><SiApplepodcasts /></div>
                                            <div className='title-div'>
                                                <p>{item.Accuracy} <span> %</span></p>
                                                <p className='help-text'>Accuracy</p>
                                            </div> 
                                        </Col>
                                        <Col md={2} className='performance-icon mobile-width50-perc mobile-margin-bottom12 mobile-margin-top12'>
                                            <div className='percentile-icon'><FaPercent /></div>
                                            <div className='title-div'>   
                                                <p>{item.Percentile} <span> %</span></p>
                                                <p className='help-text'>Percentile</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className='Sectional-Summary mobile-width100 mobile-row'>
                                        <Col md={3}>
                                            <h5 className='Summary-name'>Sectional Summary</h5>
                                        </Col>
                                        { 
                                            item.cutoff_status == 0 ? '' :
                                                <Col md={9} className='cutoff-section'>
                                                    <h6>Estimated cutoffs :</h6>
                                                    <select className='cutoff' onChange={CutoffFuction}>
                                                        <option value={item.obc}>OBC</option>
                                                        <option value={item.ews}>EWS</option>
                                                        <option value={item.sc}>SC</option>
                                                        <option value={item.st}>ST</option>
                                                        <option value={item.esm}>ESM</option>
                                                        <option value={item.ur}>UR</option>
                                                        <option value={item.oh}>OH</option>
                                                        <option value={item.vh}>HH</option>
                                                        <option value={item.vh}>VH</option>
                                                        <option value={item.Others_PWD}>Others-PWD </option>
                                                    </select>
                                                </Col>
                                        }
                                    </Row>

                                    <Row className='tb-card mobile-width100 overflow-x-scroll mobile-row'>
                                        <table className="table-grid" id="table-id">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><span className="lt-blue">Section Name<span></span></span></th>
                                                    <th scope="col"><span className="lt-blue">Score</span></th>
                                                    <th scope="col"><span className="lt-blue">Attempted</span></th>
                                                    <th scope="col"><span className="lt-blue">Accuracy</span></th>
                                                    <th scope="col"><span className="lt-blue">Time</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.Subjects.map((sb, j) =>
                                                        <>
                                                            <tr key={j}>
                                                                <td data-label="Section Name"><span className="txt-bold">{sb.SubjectName}</span></td>

                                                                <td data-label="Score" className="score">
                                                                    <div className="indicator_progress marks_indicator_progress" style={{ width: sb.score_percentage + '%' }}></div>
                                                                    <span className="txt-bold">{sb.SubScore}</span>
                                                                    <span className="lt-blue"> / {sb.SubTotalMarks}</span>
                                                                </td>

                                                                <td data-label="Attempted" className="attempted">
                                                                    <div className="indicator_progress attempted_indicator_progress" style={{ width: sb.attempted_percentage + '%' }}></div>
                                                                    <span className="txt-bold">{sb.SubAttempted}</span>
                                                                    <span className="lt-blue"> / {sb.SubTotalQuestion}</span>
                                                                </td>

                                                                <td data-label="Accuracy" className="accuracy">
                                                                    <div className="indicator_progress accuracy_indicator_progress" style={{ width: sb.SubAccuracy + '%' }}></div>
                                                                    <span className="txt-bold">{sb.SubAccuracy} %</span>
                                                                </td>

                                                                <td data-label="Time" className="time">
                                                                    <div className="indicator_progress time_indicator_progress" style={{ width: sb.time_percentage + '%' }}></div>
                                                                    <span className="txt-bold">{sb.SubTakingTime}</span><span className="lt-blue"> / {sb.SubTotalTime} min</span>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )}
                                                <tr>
                                                    <td scope="row" data-label="Section Name"><h6>Overall</h6></td>

                                                    <td data-label="Score" className="score">
                                                        <div className="indicator_progress marks_indicator_progress" style={{ width: item.your_score_perc + '%' }}></div>
                                                        <h6 style={{ margin: '0px' }}>{item.Score}<span className="lt-blue"> /{item.TotalMarks}</span></h6>{item.cutoff_status == 0 ? '' : <h6 style={{ fontSize: '12px', color: 'red' }}><FaExclamationCircle /> {cutoff} cut-off</h6>} <span className="lt-blue" style={{ color: "#e4174f" }}><i className="fas fa-exclamation-circle" aria-hidden="true"></i></span>
                                                    </td>

                                                    <td data-label="Attempted" className="attempted">
                                                        <div className="indicator_progress attempted_indicator_progress" style={{ width: item.y_total_attempted + '%' }}></div>
                                                        <h6>{item.Attempted}<span className="lt-blue"> /{item.TotalQuestions}</span></h6>
                                                    </td>

                                                    <td data-label="Accuracy" className="accuracy">
                                                        <div className="indicator_progress accuracy_indicator_progress" style={{ width: item.Accuracy + '%' }}></div>
                                                        <h6>{item.Accuracy} %</h6>
                                                    </td>
                                                    <td data-label="Time" className="time">
                                                        <div className="indicator_progress time_indicator_progress" style={{ width: item.your_time_perc + '%' }}></div>
                                                        <h6>{item.TotalTimeTaken}<span className="lt-blue"> / {item.Totaltime} min</span></h6>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Row>

                                    <Row className='compare-topper-div mobile-width100 mobile-margin0 mobile-row'>
                                        <Col md={9} className='mobile-padding0'>
                                            <Row className='mobile-row'>
                                                <Col>
                                                    <h5 className='compare-title'>Compare with Topper</h5>
                                                </Col>
                                            </Row>
                                            <div className='compare-div overflow-x-scroll'>
                                                <table>   
                                                    <thead>
                                                        <tr>
                                                            <th> </th>
                                                            <th>Score</th>
                                                            <th>Accuracy</th>
                                                            <th>Correct</th>
                                                            <th>Wrong</th>
                                                            <th>Time</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        item.compare.map((cmp, k) =>

                                                            <tbody key={k}>
                                                                <tr>
                                                                    <td>You</td>
                                                                    <td>
                                                                        <div className="indicator_progress marks_indicator_progress" style={{ width: cmp.your_score_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.YourScore}</span>
                                                                        <span className="c-lt-blue"> / {cmp.TotalScore}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress accuracy_indicator_progress" style={{ width: cmp.YourAccuracy + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.YourAccuracy}%</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress correct_indicator_progress" style={{ width: cmp.your_correct_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.YourCorrect}</span>
                                                                        <span className="c-lt-blue"> / {item.TotalQuestions}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress wrong_indicator_progress" style={{ width: cmp.your_wrong_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.YourWrong}</span>
                                                                        <span className="c-lt-blue"> / {item.TotalQuestions}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress time_indicator_progress" style={{ width: cmp.your_time_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{item.TotalTimeTaken}</span>
                                                                        <span className="c-lt-blue"> / {item.Totaltime} mins</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Topper</td>
                                                                    <td>
                                                                        <div className="indicator_progress marks_indicator_progress" style={{ width: cmp.topper_score_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.TopperScore}</span>
                                                                        <span className="c-lt-blue"> / {cmp.TotalScore}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress accuracy_indicator_progress" style={{ width: cmp.TopperAccuracy + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.TopperAccuracy}%</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress correct_indicator_progress" style={{ width: cmp.topper_correct_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.TopperCorrect}</span>
                                                                        <span className="c-lt-blue"> / {item.TotalQuestions}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress wrong_indicator_progress" style={{ width: cmp.topper_wrong_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.TopperWrong}</span>
                                                                        <span className="c-lt-blue"> / {item.TotalQuestions}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress time_indicator_progress" style={{ width: cmp.topper_time_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.TopperTime}</span>
                                                                        <span className="c-lt-blue"> / {item.Totaltime} mins</span>
                                                                    </td>
                                                                </tr>
                                                              {/*   <tr>
                                                                    <td>Avg</td>
                                                                    <td>
                                                                        <div className="indicator_progress marks_indicator_progress" style={{ width: cmp.AvgScore + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.AvgScore}</span>
                                                                        <span className="c-lt-blue"> / {cmp.TotalScore}</span>
                                                                    </td>
                                                                    <td>  
                                                                        <div className="indicator_progress accuracy_indicator_progress" style={{ width: cmp.AvgAccuracy + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.AvgAccuracy}%</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress correct_indicator_progress" style={{ width: cmp.AvgCorrect + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.AvgCorrect}</span>
                                                                        <span className="c-lt-blue"> / {item.TotalQuestions}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress wrong_indicator_progress" style={{ width: cmp.AvgWrong + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.AvgWrong}</span>
                                                                        <span className="c-lt-blue"> / {item.TotalQuestions}</span>
                                                                    </td>
                                                                    <td>
                                                                        <div className="indicator_progress time_indicator_progress" style={{ width: cmp.avg_time_perc + '%' }}></div>
                                                                        <span className="c-txt-bold">{cmp.AvgTime}</span>
                                                                        <span className="c-lt-blue"> / {item.Totaltime} mins</span>
                                                                    </td>   
                                                                </tr> */}
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>

                                            <Row className='mobile-row'>
                                                <Col>
                                                    <h5 className='mark-distribution-title'>Marks Distribution</h5>
                                                </Col>
                                            </Row>
                                            <Row className='mark-distribution mobile-row'>
                                                <Col className='mobile-width100 mobile-padding-right0'>
                                                    <Line
                                                        data={marks_distribution}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: 'Marks Distribution',
                                                                fontSize: 20
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </Col>           
                                            </Row>
                                        </Col>
                                        <Col md={3} className='mobile-padding0'>              
                                            <Row className='mobile-row'>
                                                <Col>           
                                                    <h5 className='compare-title'>Top Rankers</h5>
                                                </Col>  
                                            </Row>    
                                            <Row className='ranker-div mobile-width100-perc mobile-overflow-x-scroll mobile-margin0 mobile-row'>
                                                {
                                                    item.TopRanker.map((tp, m) =>
                                                        <>
                                                            <Col key={m}>
                                                                <span className='ranking'>{m + 1}.</span>
                                                                <div className='ranker-img'><FaUserCircle /></div>
                                                                <div className='ranker-marks'>
                                                                    <p className='ranker-help-text' style={{textTransform: 'uppercase'}}> {tp.Name}</p>
                                                                    <p className='om'>{tp.RankerMarks} <span className='tm'>/ {totalMark}</span></p>
                                                                </div>
                                                            </Col>
                                                            <hr />
                                                        </>
                                                    )
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </Fragment>
                            )
                        }
                    </Container>
                </div>
            </div>
        </>
    )
}
export default Attempted