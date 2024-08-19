import React from 'react';
import './Question1.css';
const Question1 = () => {
    return (
        <div className='question'>
            <h3>Question: What is the differences between Props and State?</h3>
            <p><strong>Answer:</strong> Difference between Props and State are given below:</p>
            <table id="props-state">
                <tr>
                    <th>Props</th>
                    <th>State</th>
                </tr>
                <tr>
                    <td>Props make components reuseable by giving components the ability to receive data from their parent component in the form of properties.</td>
                    <td>State is a part of component which can not be used or updated from outside of the component.</td>
                </tr>
                <tr>
                    <td>It's like a function parameters.</td>
                    <td>It's like a local variable in a function.</td>
                </tr>
                <tr>
                    <td>Props are immutable.</td>
                    <td>State is mutable.</td>
                </tr>
                <tr>
                    <td>Props is synchornus.</td>
                    <td>Changes of state is asynchronus.</td>
                </tr>
            </table>
        </div>
    );
};

export default Question1;