import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <nav className='d-flex justify-content-around align-items-center bg-light p-3'>
            <div>
                <h3><Link className='text-decoration-none' to="/">MealDB</Link></h3>
            </div>
            <div className='nav-bar'>
                <Link className='text-decoration-none me-4 nav-item' to="/">Home</Link>
                <Link className='text-decoration-none me-4 nav-item' to="/restaurent">Restaurent</Link>
                <Link className='text-decoration-none me-4 nav-item' to="/about">About</Link>
            </div>
        </nav>
    );
};

export default Header;