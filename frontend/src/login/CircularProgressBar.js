import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import default styles

const CircularProgressBar = ({ percentage }) => {
    return (
        <div style={{ width: '24px', marginLeft: '16px' }}>
            <CircularProgressbar value={percentage} text="" />
        </div>
    );
};

export default CircularProgressBar;
