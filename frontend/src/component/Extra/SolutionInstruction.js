import { Row, Col } from 'react-bootstrap'
import MathElement from "./MathMl"
const SolutionInstruction = ({ data, show_paper, questionPaperFun }) => {

    return (
        <>
            {
                show_paper &&
                <Col md={9} className='ques-row mobile-width100' >
                    <Row className='questin-paper-div'>
                        <Col className='question-section'>
                            <h2 className='sol-question_paper_heading'>Question Paper</h2>
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
                    <Row className='sol-bottom-div'>
                        <Col>
                            <button className='back-button' onClick={questionPaperFun} >Back</button>
                        </Col>
                    </Row>
                </Col>
            }
        </>
    )
}
export default SolutionInstruction;