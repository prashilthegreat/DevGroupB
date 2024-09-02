import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    if (user) {
        navigate('/');
        user.displayName = name;
    }
    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        setName(name);
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(email, password);
        console.log('create', email, password);
    }

    return (
        <div className='container w-50 mx-auto shadow-lg p-4 my-5'>
            <h2 className='text-primary text-center my-2'>Please Register</h2>
            <Form className='mt-3' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" name='name' placeholder="Your Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
                    Register
                </Button>
            </Form>
            <p>Already have an account? <Link to="/login" className='text-primary pe-auto text-decoration-none'>Login</Link> </p>

            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;