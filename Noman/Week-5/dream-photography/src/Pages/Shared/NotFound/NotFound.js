import React from 'react';
import notfound from '../../../images/notfound.jpg';
const NotFound = () => {
    return (
        <div className='mb-5'>
            <img src={notfound} alt="" className='mx-auto d-block w-50 mb-5' />
        </div>
    );
};

export default NotFound;