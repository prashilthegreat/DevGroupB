import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let errorMessage;
    const [resetError, setResetError] = useState('')
    const [email, setEmail] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, error1] = useSendPasswordResetEmail(
        auth
    );

    if (user) {
        navigate(from, { replace: true });
    }
    if (error) {
        errorMessage = <p className='text-danger'>{error.message}</p>;
    }
    const handleSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
    }
    const emailOnChange = event => {
        setEmail(event.target.value);
    }
    const handleResetPassword = event => {
        if (email) {
            sendPasswordResetEmail(email);
            setResetError('');
            toast('Email sent');
        }
        else {
            setResetError('Please enter your email');
        }
    }
    return (
        <div className='container w-50 mx-auto shadow-lg p-4 my-5'>
            <h2 className='text-primary text-center my-2'>Please Login</h2>
            <Form className='mt-3' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={emailOnChange} type="email" name='email' placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                {errorMessage}
                <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
                    Login
                </Button>
            </Form>
            <p className='text-danger'>{resetError}</p>
            <p>New to Dream Photography? <Link to="/register" className='text-primary pe-auto text-decoration-none'>Please Register</Link> </p>
            <p className='mb-4'>Forget Password? <button onClick={handleResetPassword} className='btn btn-link text-primary pe-auto text-decoration-none'>Reset Password</button> </p>

            <SocialLogin></SocialLogin>
            <ToastContainer />
        </div>
    );
};

export default Login;