import React from 'react';
import './Header.css';
const Header = () => {
    return (
        <nav className='header'>
            <div className='header-title'>
                <h2>Gadget and Gear</h2>
            </div>
            <div className='nav-list'>
                <a href="/home">Home</a>
                <a href="/products">Products</a>
                <a href="/orders">Orders</a>
                <a href="/about">About</a>
            </div>
        </nav>
    );
};

export default Header;