import React from 'react';

const Question2 = () => {
    return (
        <div className='question'>
            <h3>Question-2: How does useState work?</h3>
            <p><strong>Answer: </strong>useState is a function (hook) that enables you to have a state value in a functional components. useState function returns a pair of values that is the <strong>current state</strong> and a <strong>function</strong> that update the state. useState function is not a synchronus function that's why this function can't update the state right away. Moreover, if the state value is not change, then React won’t trigger a re-render. In inital state we have to declare a value of the state depend on what the variable will hold.</p>
        </div>
    );
};

export default Question2;