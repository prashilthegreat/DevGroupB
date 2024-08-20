import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const Products = (props) => {
    const { product, handleAddToCart } = props;
    const { name, imgUrl, price } = product;
    return (
        <div className='product'>
            <img src={imgUrl} alt="" />
            <div className='product-info'>
                <h3>{name}</h3>
                <p>Price: ${price}</p>
            </div>
            <button className='btn-cart' onClick={() => handleAddToCart(product)}>
                <p>Add to cart </p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div >
    );
};

export default Products;