import React from 'react';

const Blogs = () => {
    return (
        <div className='container mt-3'>
            <div className='container w-75 p-3 shadow-sm'>
                <h5>Question: What is the differences between Authentication and Authorization?</h5>
                <p><strong>Answer:</strong> Difference between Authentication and Authorization are given below: </p>
                <table class="table table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Authentication</th>
                            <th scope="col">Authorization</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Authentication verifies who the user is.</td>
                            <td>Authorization allows what type of resources an user can access.</td>
                        </tr>
                        <tr>
                            <td>In Authentication process, users are verified to access the website.</td>
                            <td>In Authorization process, users are validate to use resource.</td>
                        </tr>
                        <tr>
                            <td>Authentication appear before the Authorization process. </td>
                            <td>Authorization appear after the authentication process.</td>
                        </tr>
                        <tr>
                            <td>Authentication determines whether the person is user or not.</td>
                            <td>Authorization determines what permission user have</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Question 2 */}
            <div className='container w-75 p-3 shadow-sm my-3'>
                <h5>Qusetion: Why are you using firebase? What other options do you have to implement authentication?</h5>
                <p><strong>Answer:</strong> Firebase authentication is provided by Google which is very secured. Firebase auhtentication system focused on building secure authentication system easy. It provides differnt types of authentication sytem like email and password accounts, phone auth, and Google, Twitter, Facebook, and GitHub login, and more.</p>
                <p>There are also have many options of firebase authentications. They are Auth0, MongoDB, Passport, Okta etc.</p>
            </div>
            <div className='container w-75 p-3 shadow-sm my-3'>
                <h5>Qusetion: What other services does firebase provide other than authentication?</h5>
                <p><strong>Answer:</strong> Firebase authentication is one of the most secure authentication system which is provided by Google. There are so many extra advantages firebase authentication has which is not found in other authentication system. Like in firebase we can use free multi platform authentication (12 types of authentication) such as Google, Facebook, Github etc. Moreover firebase provides Google Analytics for Firebase also permits to track and accommodate metrics with its 52 partners. The most interesting feature firebase is fast and safe hosting. </p>
            </div>
        </div>
    );
};

export default Blogs;