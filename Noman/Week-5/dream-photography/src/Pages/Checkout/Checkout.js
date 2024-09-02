import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout = () => {
    const { checkOutName } = useParams();
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        navigate('/success');
    }
    return (
        <div className='container'>
            <h1 className='text-center'>Checkout: {checkOutName}</h1>
            <Form className='container border p-3 rounded-3 w-75' onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" placeholder="Your name" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                    <Form.Control placeholder="Phone Number" required />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Category</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Premium</option>
                            <option>Special</option>
                            <option>Basic</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Booking
                </Button>
            </Form>
        </div>
    );
};

export default Checkout;