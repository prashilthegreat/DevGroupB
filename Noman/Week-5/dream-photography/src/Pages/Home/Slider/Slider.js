import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

import slider1 from '../../../images/Slider/slider1.jpg';
import slider2 from '../../../images/Slider/slider2.jpg';
import slider3 from '../../../images/Slider/slider3.jpg';

const Slider = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={600}
                    src={slider1}
                    alt="First slide"
                />
                <Carousel.Caption className=''>
                    <h3>Birthday Celebration</h3>
                    <p>We make your birthday special!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={600}
                    src={slider2}
                    alt="First slide"
                />

                <Carousel.Caption>
                    <h3>Engagement</h3>
                    <p>Make your Engagement special!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    height={600}
                    src={slider3}
                    alt="First slide"
                />

                <Carousel.Caption>
                    <h3>Wedding</h3>
                    <p>
                        A wedding, we make it special for you.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;