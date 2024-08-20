import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Products from '../Products/Products';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
const Shop = () => {
    const [products, setProducts] = useState([]);
    let [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('product.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])

    const handleAddToCart = product => {
        debugger;
        let newCart;
        const exist = cart.find(cartProduct => cartProduct.id === product.id);
        console.log(exist);
        if (!exist) {
            newCart = [...cart, product];
            setCart(newCart);
        }
        // console.log(cart);
    }
    const [randomNum, setRandomNum] = useState(-1);
    const handleChoose = () => {
        debugger;
        document.getElementById('select-item').style.display = 'block';
        const cartLength = cart.length;
        if (cartLength === 0) {
            document.getElementById('select-item').style.display = 'none';
        }
        if (cartLength > 0) {
            const rand = Math.random();
            const random = Math.round(rand * (cartLength - 1));
            setRandomNum(random);
            console.log(randomNum);
        }
    }
    const handleReset = () => {
        setCart([]);
        document.getElementById('select-item').style.display = 'none';
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Products key={product.id} product={product} handleAddToCart={handleAddToCart}></Products>)
                }
            </div>
            <div className="cart-container">
                <div className="cart-details">
                    <h3 className='order-title'>Selected items</h3>
                    {
                        cart.map(product => <Product key={product.id} product={product}></Product>)
                    }
                    <button className='choose-button' onClick={handleChoose}>Choose 1 for me</button>
                    <button className='reset' onClick={handleReset}>
                        Reset <FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon>
                    </button>
                    <div id="select-item">
                        <h3>You should choose: </h3>
                        {
                            randomNum >= 0
                                ? <Product product={cart[randomNum]}></Product>
                                : console.log(randomNum)
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Shop;