import React, { useEffect } from 'react'

const CountUp = ({ MinSecs, singleTime, pause }) => {
    const { minutes = 0, seconds = 0 } = MinSecs;
    const [[mins, secs], setTime] = React.useState([minutes, seconds]);
     
    const tick = () => {
        if (mins == 0 && secs == 0) {
            setTime([0, parseInt(secs) + 1]);   
        } else if (secs == 60) {
            setTime([parseInt(mins) + 1, 1]);
        } else {
            setTime([parseInt(mins), secs + 1]);   
        }
    };

    React.useEffect(() => {          
        const timerId = setInterval(() => { if (!pause) { tick() } }, 1000);
        return () => clearInterval(timerId);
    }, [secs]);

    let tTem = '00' + ':' + mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');

    useEffect(() => {
        singleTime(tTem)
    }, [secs])

    return (
        <>
            {`${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}
        </>
    );
}

export default CountUp;