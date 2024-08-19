import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Product = (props) => {
    return (
        <div className='order-info'>
            <img src={props?.product?.imgUrl} alt="" />
            <h3>{props?.product?.name}</h3>
            <button className='delete-button'>
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;