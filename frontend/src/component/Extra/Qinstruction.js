import { Row, Col } from 'react-bootstrap'
import MathElement from "./MathMl"
const Qinstruction = ({ data, show_paper, instructionShow, questionPaperFun, instructionFun }) => {

    return (
        <>
            {
                show_paper &&
                <Col md={9} className='ques-row'>
                    <Row className='questin-paper-div'>
                        <Col className='question-section'>
                            <h2 className='question_paper_heading'>Question Paper</h2>
                            <hr />
                            {
                                data && data.map((qs) =>
                                    <>
                                        <div key={qs.qid}> <MathElement elements={qs.question} /></div>
                                        <hr />
                                    </>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className='footer-bottom-div'>
                        <Col>
                            <button className='back-button' onClick={questionPaperFun} >Back</button>
                        </Col>
                    </Row>
                </Col>
            }
            {
                instructionShow &&
                <Col md={9} className='ques-row' >
                    <Row className='instruction-div'>
                        <h2 className='instruction_heading'>Instructions</h2>
                        <hr />
                        <ol className='instruction-ol'>
                            <p className='general-instruction'>General Instructions:</p>
                            <li>The clock has been set at the server and the countdown timer at the top right corner of your screen will display the time remaining for you to complete the exam. When the clock runs out the exam ends by default - you are not required to quit or submit your exam</li>
                            <li>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                                <ol className="for-desktop">
                                    <li className="mt-15">
                                        <button className="mark_1"></button>&nbsp;  <span>You have not visited the question yet.</span>
                                    </li>
                                    <li className="mt-15">
                                        <button className="mark_2"></button>&nbsp;  <span>You have not answered the question.</span>
                                    </li>
                                    <li className="mt-15">
                                        <button className="mark_3"></button>&nbsp;  <span>You nave answered the question.</span>
                                    </li>
                                    <li className="mt-15">
                                        <button className="mark_4"></button>&nbsp;  <span>You have NOT answered the question but have marked the question for review</span>
                                    </li>
                                    <li className="mt-15">
                                        <span className="mark_5"><b className="correct-opt"> &#10004; </b> </span>&nbsp;  <span>You have answered the question but marked it for review.</span>
                                    </li>
                                </ol>
                            </li>

                            <p>The <b>Mark For Review</b> status for a question simply indicates that you would like to look at that question again. If a question is answered, but marked for review, then the answer will be considered for evaluation unless the status is modified by the candidate.</p>
                            <b>Navigating to a Question :</b>

                            <ol start="3">
                                <li>
                                    <p>To answer a question, do the following:</p>
                                    <ol className="order-list">
                                        <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                                        <li>Click on <b>Save &amp; Next</b> to save your answer for the current question and then go to the next question.</li>
                                        <li>Click on <b>Mark for Review <span className="hide-on-railway">&amp; Next</span></b> to save your answer for the current question and also mark it for review <span className="hide-on-railway">, and then go to the next question.</span></li>
                                    </ol>
                                </li>
                            </ol>

                            <p>Note that your answer for the current question will not be saved, if you navigate to another question directly by clicking on a question number <span>without saving</span> the answer to the previous question.</p>
                            <p>You can view all the questions by clicking on the <b>Question Paper</b> button. <span style={{ color: '#ff0000' }}>This feature is provided, so that if you want you can just see the entire question paper at a glance.</span></p>
                            <h4>Answering a Question :</h4>

                            <ol start="4">
                                <li>
                                    <p>Procedure for answering a multiple choice (MCQ) type question:</p>
                                    <ol className="order-list">
                                        <li>Choose one answer from the 4 options (A,B,C,D) given below the question<span className="hide-on-railway">, click on the bubble placed before the chosen option.</span></li>
                                        <li className="hide-on-railway">To deselect your chosen answer, click on the bubble of the chosen option again or click on the <b><span className="hide-on-railway">Clear Response</span><span className="show-on-railway">Erase Answer</span></b> button</li>
                                        <li>To change your chosen answer, click on the bubble of another option.</li>
                                        <li>To save your answer, you MUST click on the <b>Save &amp; Next</b></li>
                                    </ol>
                                </li>
                                <li>
                                    <p>Procedure for answering a numerical answer type question :</p>
                                    <ol className="order-list">
                                        <li>To enter a number as your answer, use the virtual numerical keypad.</li>
                                        <li>A fraction (e.g. -0.3 or -.3) can be entered as an answer with or without "0" before the decimal point. <span style={{ color: "red" }}>As many as four decimal points, e.g. 12.5435 or 0.003 or -932.6711 or 12.82 can be entered.</span></li>
                                        <li>To clear your answer, click on the <b>Clear Response</b> button</li>
                                        <li>To save your answer, you MUST click on the <b>Save &amp; Next</b></li>
                                    </ol>
                                </li>
                                <li ng-show="isJeeTestInterfaceUsed" className="ng-hide"><p>Procedure for answering a multiple correct answers (MCAQ) type question</p>
                                    <ol className="order-list">
                                        <li>Choose one or more answers from the 4 options (A,B,C,D) given below the question, click on the bubble placed before the chosen option.</li>
                                        <li>To deselect your chosen answer, click on the checkbox of the chosen option again</li>
                                        <li>To clear your marked responses, click on the <b>Clear Response</b> button</li>
                                        <li>To save your answer, you MUST click on the <b>Save &amp; Next</b> button</li>
                                    </ol>
                                </li>
                                <li><p>To mark a question for review, click on the <b>Mark for Review <span className="hide-on-railway">&amp; Next</span></b> button. If an answer is selected (for MCQ/MCAQ) entered (for numerical answer type) for a question that is <b>Marked for Review</b> , that answer will be considered in the evaluation unless the status is modified by the candidate.</p></li>
                                <li><p>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</p></li>
                                <li><p>Note that ONLY Questions for which answers are <b>saved</b> or <b>marked for review after answering</b> will be considered for evaluation.</p></li>
                                <li><p>Sections in this question paper are displayed on the top bar of the screen. Questions in a Section can be viewed by clicking on the name of that Section. The Section you are currently viewing will be highlighted.</p></li>
                                <li><p>After clicking the <b>Save &amp; Next</b> button for the last question in a Section, you will automatically be taken to the first question of the next Section in sequence.</p></li>
                                <li><p>You can move the mouse cursor over the name of a Section to view the answering status for that Section.</p>
                                </li>
                            </ol>
                        </ol>
                    </Row>
                    <Row className='footer-bottom-div'>
                        <Col>
                            <button className='back-button' onClick={instructionFun} >Back</button>
                        </Col>
                    </Row>

                </Col>
            }
        </>
    )
}
export default Qinstruction;