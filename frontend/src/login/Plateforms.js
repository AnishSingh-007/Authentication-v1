import pi1 from '../assests/pi-1.png';
import pi2 from '../assests/pi-2.png';
import pi3 from '../assests/pi-3.png';
import pi4 from '../assests/pi-4.png';
import pi5 from '../assests/pi-5.png';
import pi6 from '../assests/pi-6.png';
import './Plateforms.css';

const Plateforms = () => {
    return (
    <div className='main-div'> 
        <span className='plateform-span'>Platforms</span>
        <div className='p-div'>
            <div className='content-div'>
                <img src={pi1} alt="pi1"/>
                <span className='text-span'>Books - Pinnacle Publications</span>
            </div>
            <div className='content-div'>
                <img src={pi2} alt="pi1"/>
                <span className='text-span'>Digital books</span>
            </div>
            <div className='content-div'>
                <img src={pi3} alt="pi1"/>
                <span className='text-span'>Test portal</span>
            </div>
            <div className='content-div'>
                <img src={pi4} alt="pi1"/>
                <span className='text-span'>Typing Software</span>
            </div>
            <div className='content-div'>
                <img src={pi5} alt="pi1"/>
                <span className='text-span'>Videos Portal</span>
            </div>
            <div className='content-div'>
                <img src={pi6} alt="pi1"/>
                <span className='text-span'>Research and Development</span>
            </div>
            
        </div>
    </div>);
}

export default Plateforms;