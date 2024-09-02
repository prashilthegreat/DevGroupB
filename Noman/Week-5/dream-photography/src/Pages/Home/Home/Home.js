import React from 'react';
import Categories from '../Categories/Categories';
import Reviews from '../Reviews/Reviews';
import Slider from '../Slider/Slider';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Categories></Categories>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;