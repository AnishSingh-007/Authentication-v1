import React, { useState, useRef, useEffect } from 'react';
import { FaExclamationTriangle } from "react-icons/fa"
import { Modal, Button, Overlay, Tooltip } from 'react-bootstrap'
import { useCookies } from 'react-cookie'

function SolutionReport({ question_id, paper_code, exam_mode_id, test_series_id }) {
    const [cookies] = useCookies()
    const [mshow, setMShow] = useState(false);
    const handleClose = () => setMShow(false);
    const [show, setShow] = useState(false);
    const target = useRef(null); 
    const [reportData, setReportData] = useState();
    const [reportID, setReportID] = useState();

    const handleShow = (e) => {
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const FormattingShow = (e) => {
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const TranslationShow = (e) => {
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const OthersShow = (e) => {
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const WrongAnswer = (e) => {
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const NoSolution = (e) => {
        setMShow(true)
        setShow(!show)
        setReportID(e.target.id)
    }
    const reportdata = (e) => {
        setReportData(e.target.value)
    }
    const submitReport = async () => {
        let rdata = { 'email_id': cookies.email_id, 'exam_mode_id': exam_mode_id, 'test_series_id': test_series_id, 'reportID': reportID, 'reportdata': reportData, 'paper_code': paper_code, 'question_id': question_id }
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

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const ref = useRef()
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    return (
        <>
            <span className='sol-report' ref={target} onClick={() => setShow(!show)}><FaExclamationTriangle /> Report</span> 
            <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        <p onClick={handleShow} id="1">Wrong Question</p>
                        <p onClick={WrongAnswer} id="5">Wrong Answer</p>
                        <p onClick={FormattingShow} id="2">Formatting Issue</p>
                        <p onClick={TranslationShow} id="3">Wrong Translation</p>
                        <p onClick={NoSolution} id="6">No Solution</p>
                        <p onClick={OthersShow} id="4">Others</p>
                    </Tooltip>
                )} 
            </Overlay> 

          {/*  <div className="wrapper" ref={ref}>
                <button className="sol-report" onClick={() => setIsMenuOpen(oldState => !oldState)}>
                <FaExclamationTriangle /> Report
                </button>
                {isMenuOpen && (
                    <ul className="tooltip-inner">
                        <li onClick={NoSolution} id="6">No Solution</li>
                        <li onClick={OthersShow} id="4">Others</li>
                        <li onClick={handleShow} id="1">Wrong Question</li>
                        <li onClick={WrongAnswer} id="5">Wrong Answer</li>
                        <li onClick={FormattingShow} id="2">Formatting Issue</li>
                        <li onClick={TranslationShow} id="3">Wrong Translation</li>
                    </ul>
                )}
            </div> */}
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

export default SolutionReport;