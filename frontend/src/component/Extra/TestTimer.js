import LeftTimer from './LeftTimer';
import { useEffect, useState } from 'react'
function TestTimer({ hours, mins, secs, setTest }) {

  const hoursMinSecs = { hours: hours, minutes: mins, seconds: secs }
  const [rmTm, setrmTm] = useState()
  const rmTimeFun = (rTm) => {
    setrmTm(rTm)
  }

  if (rmTm == '00:00:00') {
    setTest('Start Test')
  }             

  return (
    <div className="App">
      <LeftTimer hoursMinSecs={hoursMinSecs} rmTimeFun={rmTimeFun} />
    </div>
  );
}

export default TestTimer;