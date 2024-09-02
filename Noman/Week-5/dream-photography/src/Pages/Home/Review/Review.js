import React from 'react';
import { Col, Card } from 'react-bootstrap';

const Review = ({ review }) => {
    const { name, comment, imgUrl } = review;
    return (
        <Col>
            <Card className='p-3'>
                <Card.Img variant="top" src={imgUrl} className='w-50 rounded-circle mx-auto d-block' />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {comment}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Review;