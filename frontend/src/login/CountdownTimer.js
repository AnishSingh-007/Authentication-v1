import { useState, useEffect } from 'react';
import CircularProgressBar from './CircularProgressBar';
import { BsWhatsapp } from "react-icons/bs";
import './CountdownTimer.css';

const CountdownTimer = ({ resendOtp, initialSeconds }) => {
    //console.log(initialSeconds)
   
    let [seconds, setSeconds] = useState(initialSeconds)
    const [progress, setProgress] = useState(100);
    
    useEffect(() => {
        if (seconds > 0) {
          const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
    
          return () => clearInterval(timer);
        }
    }, [seconds]);

    useEffect(() => {
        const interval = setInterval(() => {
          setProgress((seconds / initialSeconds) * 100);
        }, 1000);
    
        return () => clearInterval(interval);
    }, [seconds, initialSeconds]);

    const resendOtpClicked = () => {
        setSeconds(30);
        setProgress(100);
        resendOtp('mobile')
    }

    const resendOtpWhatsApp = () => {
      setSeconds(30);
      setProgress(100);
      resendOtp('whatsapp')
    }

    return (
        <div>
          {seconds === 0 ? (
            <div>
              <button onClick={resendOtpClicked} className='btn-ct-resend-otp' type="submit">Resend OTP</button>
              <button onClick={resendOtpWhatsApp} class="btn-ct-sent-otp-wa" type="submit"><BsWhatsapp className='wa-icon'/> Send OTP on WhatsApp</button>
            </div>
          ) : (
            <div style={{display: 'flex'}}>
                <span className='span-ct-resend'>Resend OTP in {seconds}s</span>
                <CircularProgressBar percentage={progress} />
            </div>
          )}
        </div>
    );
}

export default CountdownTimer;