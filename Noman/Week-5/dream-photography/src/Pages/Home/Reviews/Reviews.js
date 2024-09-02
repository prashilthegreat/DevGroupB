import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Review from '../Review/Review';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('review.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
    return (
        <div className='mt-5'>
            <h1 className='text-center my-3'>Happy Client Says...</h1>
            <Row xs={1} md={2} lg={3} className="g-4 container mx-auto">
                {
                    reviews.map(review => <Review key={review.id} review={review}></Review>)
                }
            </Row>
        </div>
    );
};

export default Reviews;