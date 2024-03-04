import Header1 from './Header1';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie'
        
 
function Test() {
    const [cookies] = useCookies()
    const { language, papercode, exam_mode_id, test_series_id, paperids } = useParams();
    const languages = atob(language);
    const paper_cod = atob(papercode);
    const exam_mod_id = atob(exam_mode_id);
    const test_seris_id = atob(test_series_id);
    const paper_id = atob(paperids);
    const [paper_code, setPaperCode] = useState();
    const [subjectID, setSubjectID] = useState('');
    const [hrs, setHours] = useState('');
    const [mins, setMinutes] = useState('');
    const [secs, setSeconds] = useState(''); 
    const [Answered, setAnsweredCount] = useState(0)
    const [NotAnswered, setNotAnsweredCount] = useState(0)
    const [Marked, setMarkedCount] = useState(0)
    const [MarkedAnswered, setMarkedAnsweredCount] = useState(0)
    const [NotVisited, setNotVisitedCount] = useState('')
    const [subject_name, setSubject_name] = useState('')
    const [title, setTitle] = useState()
    const [testType, setTestType] = useState()

    useEffect(() => { 
        async function papersRes(){
        let papers = { 'paper_code': paper_cod, 'email_id': 'neerajit@ssccglpinnacle.com' }
        console.log(papers)
        let papers_res = await fetch("http://localhost:5000/paperCodeDetails", {
            method: 'POST',
            headers: {   
                "Content-Type": "application/json"
            },
            body: JSON.stringify(papers)
        });

        papers_res = await papers_res.json();
        console.log(papers_res)
        setPaperCode(papers_res.paper_code)
        setSubjectID(papers_res.subject_id)
        setHours(papers_res.hrs)
        setMinutes(papers_res.mins)
        setSeconds(papers_res.secs)
        setSubject_name(papers_res.subject_name)
        setAnsweredCount(papers_res.answered_count)
        setNotAnsweredCount(papers_res.notanswered_count)
        setMarkedCount(papers_res.marked_count)
        setMarkedAnsweredCount(papers_res.marked_answered_count)
        setNotVisitedCount(papers_res.not_visited)
        setTitle(papers_res.title)
        setTestType(papers_res.test_type)
        }

        papersRes()       
    }, [paper_cod])
    //console.log(NotVisited)
    return (
        <>          
            <div className="App">
                { 
                    title && <Header1 hrs={hrs} mins={mins} test_series_id={test_seris_id} exam_mode_id={exam_mod_id} secs={secs} paper_code={paper_code} subjectID={subjectID} NotVisited={NotVisited} Answered={Answered} NotAnswered={NotAnswered} Marked={Marked} MarkedAnswered={MarkedAnswered} subject_name={subject_name} title={title} languages={languages} pids={paper_id} TestTp={testType}/>
                } 
            </div>
        </>
    );
}

export default Test;
