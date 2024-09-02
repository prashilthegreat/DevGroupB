import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import google from '../../../images/social/google.png';
import github from '../../../images/social/github.png';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const [signInWithGoogle, googleUser, loading, error] = useSignInWithGoogle(
        auth);
    const [signInWithGithub, githubUser, gitLoading, gitError] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    if (googleUser || githubUser) {
        navigate(from, { replace: true });
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
            </div>
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-outline-danger w-50 d-block mx-auto my-2'>
                    <img style={{ width: '30px' }} src={google} alt="" />
                    <span className='px-2'>Google Sign In</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-outline-info w-50 d-block mx-auto my-2'>
                    <img style={{ width: '30px' }} src={github} alt="" />
                    <span className='px-2'>Github Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;