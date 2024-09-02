import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Category = (props) => {
    const { category, img, price, description } = props.cat;
    const navigate = useNavigate();
    const handleBookingButton = () => {
        navigate(`checkout/${category}`)
    }
    return (
        <Col>
            <Card>
                <Card.Img variant="top" src={img} height={426} className='img-fluid' />
                <Card.Body>
                    <Card.Title>{category}</Card.Title>
                    <Card.Text>Price: {price}</Card.Text>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <button onClick={handleBookingButton} className="btn btn-primary">Book {category}</button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Category;