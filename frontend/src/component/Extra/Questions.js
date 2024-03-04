import { Row, Col } from 'react-bootstrap'
import CountUp from './CountUp'
import MathElement from "./MathMl"
import MathJax from 'react-mathjax-preview'
import ReportModel from './ReportModel'
import { useMemo } from 'react'

function Questions({ question, qid, chooseOption, optionItem, option1, option2, option3, option4, hindi_question, hindi_option1, hindi_option2, hindi_option3, hindi_option4, language, positive_marks, negative_marks, singleTm, hrs, mins, secs, pause, Next, subject, paper_code, choosed_answer, theArray }) {

    let timememo = useMemo(() => {
        return [...theArray].reverse().filter(svq => svq.item_no == qid); 
    }, [])
	           
	 
    if (timememo != '' && timememo != undefined) {
	
        var optionVal = timememo[0]['option']
        if (optionVal == '0') {
            var optionVal = choosed_answer;
        }
        if (timememo[0]['SingleTm'] != '' && timememo[0]['SingleTm'] != undefined) {
            const [hr, mn, sc] = timememo[0]['SingleTm'].toString().split(':')
            var MinSecs = { hours: parseInt(hr), minutes: parseInt(mn), seconds: parseInt(sc) }
        }
    } else {
		 
        var optionVal = choosed_answer;
        var MinSecs = { hours: parseInt(hrs), minutes: parseInt(mins), seconds: parseInt(secs) }
    }

    var m, urls = [], optionurl1 = [], optionurl2 = [], optionurl3 = [], optionurl4 = [],
        rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

    while (m = rex.exec(question)) {
        urls.push(m[1]);
    }

    while (m = rex.exec(option1)) { optionurl1.push(m[1]); } while (m = rex.exec(option2)) { optionurl2.push(m[1]); } while (m = rex.exec(option3)) { optionurl3.push(m[1]); } while (m = rex.exec(option4)) { optionurl4.push(m[1]); }

    const singleTime = (stm) => {
        singleTm(stm)
    }

    return (
        <>
            <Row className='question-row'>
                <Col md={6} className='mobile-width30-perc mobile-float-left'>
                    <span className='question-no mobile-font-size11 mobile-margin-top15'>Qusetion No. {qid}</span>
                </Col>
                <Col md={3} className='mark-section mobile-width30-perc mobile-float-left'>
                    <p className='marks mobile-font-size12'>Marks</p>
                    <span className='positive-mark'>+{positive_marks}</span>
                    <span className='minus-mark'>-{negative_marks}</span>
                </Col>
                <Col md={1} className='single-time-margin mobile-width15-perc mobile-float-left mobile-margin-top7'>
                    <p className='single-time'>Time</p>
                    <span className='single-timer'><CountUp MinSecs={MinSecs} paper_code={paper_code} Paper_id={qid} singleTime={singleTime} pause={pause} /></span>
                </Col>
                <Col md={2} className='report-div mobile-width15-perc mobile-float-left mobile-margin-top10'>
                    <ReportModel question_id={qid} paper_code={paper_code} />
                </Col>
            </Row>

            <Row className='question-with-option' key={qid}>
                <Col>
                    <Row className='qusetion-option'>
                        <Col className='ques'>
                            {
                                Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={hindi_question} /> : <MathElement elements={question} />) : (language == 'Hindi' && subject != 7 ? urls == '' ? <MathJax math={hindi_question} /> : <MathElement elements={hindi_question} /> : urls == '' ? <MathJax math={question} /> : <MathElement elements={question} />)
                            }
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '2%' }}>
                        <Col className='options'>
                            <div>    
                                <label>
                                    <input type="radio" value="a" checked={(optionItem != '0' && optionItem != undefined) ? optionItem == 'a' : optionVal == 'a' ? optionVal : optionItem == 'a'} name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={hindi_option1.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option1.replace(/\&nbsp;/g, '')} />) : (language == 'Hindi' && subject != 7 ? optionurl1 == '' ? <MathJax math={hindi_option1.replace(/\&nbsp;/g, '')} /> : <MathElement elements={hindi_option1.replace(/\&nbsp;/g, '')} /> : optionurl1 == '' ? <MathJax math={option1.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option1.replace(/\&nbsp;/g, '')} />)}
                                </label>  
                            </div>
                            <div>
                                <label>
                                    <input type="radio" value="b" checked={(optionItem != '0' && optionItem != undefined) ? optionItem == 'b' : optionVal == 'b' ? optionVal : optionItem == 'b'} name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={hindi_option2.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option2.replace(/\&nbsp;/g, '')} />) : (language == 'Hindi' && subject != 7 ? optionurl2 == '' ? <MathJax math={hindi_option2.replace(/\&nbsp;/g, '')} /> : <MathElement elements={hindi_option2.replace(/\&nbsp;/g, '')} /> : optionurl2 == '' ? <MathJax math={option2.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option2.replace(/\&nbsp;/g, '')} />)}
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" value="c" checked={(optionItem != '0' && optionItem != undefined) ? optionItem == 'c' : optionVal == 'c' ? optionVal : optionItem == 'c'} name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={hindi_option3.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option3.replace(/\&nbsp;/g, '')} />) : (language == 'Hindi' && subject != 7 ? optionurl3 == '' ? <MathJax math={hindi_option3.replace(/\&nbsp;/g, '')} /> : <MathElement elements={hindi_option3.replace(/\&nbsp;/g, '')} /> : optionurl3 == '' ? <MathJax math={option3.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option3.replace(/\&nbsp;/g, '')} />)}
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" value="d" checked={(optionItem != '0' && optionItem != undefined) ? optionItem == 'd' : optionVal == 'd' ? optionVal : optionItem == 'd'} name="option" onChange={chooseOption} /> {Next == 'Next' ? (language == 'Hindi' && subject != 7 ? <MathElement elements={hindi_option4.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option4.replace(/\&nbsp;/g, '')} />) : (language == 'Hindi' && subject != 7 ? optionurl4 == '' ? <MathJax math={hindi_option4.replace(/\&nbsp;/g, '')} /> : <MathElement elements={hindi_option4.replace(/\&nbsp;/g, '')} /> : optionurl4 == '' ? <MathJax math={option4.replace(/\&nbsp;/g, '')} /> : <MathElement elements={option4.replace(/\&nbsp;/g, '')} />)}
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default Questions