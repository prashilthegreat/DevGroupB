import React from 'react';
import noman from '../../images/noman.png';
const AboutMe = () => {
    return (
        <div className='conatiner text-center'>
            <h1>About Me</h1>
            <div className='container shadow-lg p-3 w-50 mt-3 rounded-3'>
                <img src={noman} alt="" className='rounded-3 shadow-md mx-auto w-50 d-block' />
                <h4 className='my-3'>Abdullah Al Noman</h4>
                <p>Hey! I am Abdullah Al Noman. I have recently completed my gradutation. Before starting this course, I always wanted to be a Teacher in an University. But, now a days my goal has changed and at present I wanted to be a one of the best web developers in my sector. And to be honest, I want to see myself in a top class software company as a senior web developer after five years In Sha Allah.</p>
            </div>
        </div>
    );
};

export default AboutMe;