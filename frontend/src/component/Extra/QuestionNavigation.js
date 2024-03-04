import { Row, Col } from 'react-bootstrap'

function QuestionNavigation({ qno, questionNavigationfun, full_name, test_type, subject, testType, AnsweredCount, NotAnsweredCount, MarkedCount, MarkedAnsweredCount, NotVisitedCount, FirstLetter, SubjectName, theArray, BlurAnswerValue }) {
    const Blurfun = (e) => {
        BlurAnswerValue(e.target.getAttribute('data_status'))
    }
 
    return (
        <>
            <Row className='profilename'> 
                <Col>
                    <span className="picon">{FirstLetter}</span><span className="pname">{full_name}</span>
                    <button className={testType == 'full' ? 'sectional active' : 'sectional'} value="full" onClick={test_type}>Full Test</button>
                    <button className={testType == 'sectional' ? 'sectional active' : 'sectional'} value="sectional" onClick={test_type}>Sectional</button>
                </Col>
            </Row>
 
            <Row className='profileheight'>
                <Col className='profile'>
                    <li className="answer"><span className="answer-count">{AnsweredCount}</span>Answered</li>
                    <li className="not-answer"><span className="not-answer-count">{NotAnsweredCount}</span>Not Answered</li>
                    <li className="not-visite"><span className="not-visite-count">{NotVisitedCount}</span>Not visited</li>
                    <li className="mark"><span className="mark-count">{MarkedCount}</span>Marked for Review</li>
                    <li className="not-markvisite"><span className="markandreview">{MarkedAnsweredCount}<span className="correct-option">✔</span></span>Answered & Marked for Review</li>
                </Col>
            </Row>

            <Row className='sectionheight'>
                <Col className='subject-plate'>
                    <span className='subject-section'>SECTION: </span>
                    <span className='subject-name'>{testType == 'full' ? 'Full Test' : SubjectName}</span>
                </Col>    
            </Row>
           
            <Row className='q-plate'>
                <Col>
                    {
                        qno && testType == 'full' ? qno.map((item) =>
                            <button className={'onedigit' + item.answered_ques + theArray.filter(svq => svq.item_no == item.qid).map((tt) => tt == item.qid ? '1st onedigit' + tt.Type : '2nd onedigit' + tt.Type)} value={item.qid} id={item.answer == '' ? '0' :item.answer} data_status={item.answered_ques + theArray.filter(svq => svq.item_no == item.qid).map((tt) => tt == item.qid ? tt.Type : ','+ tt.Type)} onClick={questionNavigationfun} onBlur={Blurfun} key={item.qid}>{item.qid}</button>) :

                            qno.filter(pid => pid.subject_id == subject).map((item) =>
                                <button className={'onedigit' + item.answered_ques + theArray.filter(svq => svq.item_no == item.qid).map((tt) => tt == item.qid ? '1st onedigit' + tt.Type : '2nd onedigit' + tt.Type)} value={item.qid} id={item.answer == '' ? '0' :item.answer} data_status={item.answered_ques + theArray.filter(svq => svq.item_no == item.qid).map((tt) => tt == item.qid ? tt.Type : ','+ tt.Type)} onClick={questionNavigationfun} onBlur={Blurfun} key={item.qid}>{item.qid}</button>
                            )
                    }      
                </Col>
            </Row>
        </>
    )
}
export default QuestionNavigation