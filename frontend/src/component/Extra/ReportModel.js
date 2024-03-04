import React, { useState, useRef } from 'react';
import { FaExclamationTriangle } from "react-icons/fa"
import { Modal, Button, Overlay, Tooltip } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
function ReportModel({question_id, paper_code}) {
    const [mshow, setMShow] = useState(false);
    const handleClose = () => setMShow(false);
    const [show, setShow] = useState(false);
    const [cookies] = useCookies()              
    const target = useRef(null);
    const [reportData, setReportData] = useState();
    const [reportID, setReportID] = useState();

    const handleShow = (e) => {
        setMShow(true)
        setShow(!show) 
        setReportID(e.target.id)
    };
    const FormattingShow = (e) =>{
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const TranslationShow = (e) =>{
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const OthersShow = (e) =>{
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const reportdata = (e) =>{
        setReportData(e.target.value)
    }    
    const submitReport = async() => {
        let rdata = {'email_id': cookies.email_id, 'exam_mode_id': 1, 'test_series_id': 2, 'reportID':reportID, 'reportdata': reportData,'paper_code': paper_code, 'question_id': question_id}
        await fetch('/report', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer YOS8V94dc1Snf7pAkfm4M6bvv7EZEqDGCXkfwxHZ"
            },
            body: JSON.stringify(rdata)
        });
        setMShow(false)
    }

    return (
        <>
            <span className='report mobile-text-change-report' ref={target} onClick={() => setShow(!show)}><FaExclamationTriangle /> <span>Report</span></span>
            <Overlay target={target.current} show={show} placement="bottom"> 
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        <p onClick={handleShow} id="1">Wrong Question</p>
                        <p onClick={FormattingShow} id="2">Formatting Issue</p>
                        <p onClick={TranslationShow} id="3">Wrong Translation</p>
                        <p onClick={OthersShow} id="4">Others</p> 
                    </Tooltip>
                )}
            </Overlay>

            <Modal
                show={mshow}
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tell Us more</Modal.Title>
                </Modal.Header>
                <Modal.Body className='report-model'>
                   <textarea className='report-text' name="reporttext" onChange={reportdata} placeholder='Please tell us more about the issue for the quick resolution.'></textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={submitReport}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReportModel;