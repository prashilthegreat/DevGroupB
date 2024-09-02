import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Category from '../Category/Category';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('categories.json')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);
    return (
        <div className='mt-5'>
            <h1 className='text-center my-3'>Packages</h1>
            <Row xs={1} md={2} lg={3} className="g-4 container mx-auto">
                {
                    categories.map(category => <Category key={category.id} cat={category}></Category>)
                }
            </Row>
        </div>
    );
};

export default Categories;