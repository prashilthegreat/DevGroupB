import React from 'react';

const Restaurent = () => {
    const searchFood = e => {
        console.log(e.target.value);
    }
    return (
        <div className='restaurent mt-4'>
            <h3>Search your favourite Meal</h3>
            <input className='form-control w-50 mx-auto' type="text" onChange={searchFood} />
        </div>
    );
};

export default Restaurent;