import React, { useState, useEffect } from 'react';

import mainLogo from '../images/logo.png'
import username from '../images/user.png'
import password from '../images/lock.png'
import email from '../images/email.png'

function Register(){
    const [formData, setFormData] = useState({ name: '', email: '', password: '' , confirmPassword: ''});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
            // Ensure no field is empty
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            console.log('All fields are required');
            return;
        }

        // Ensure valid email
        // You can use a simple regex for email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            console.log('Invalid email');
            return;
        }

        // Ensure password and confirmPassword are the same
        if (formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        // Send a POST request to the /signup endpoint of your backend API
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Register form submitted:', data);
            window.location.href = '/login';
        } else {
            console.log('Register failed:', response.status);
        }
    };
    
    
    return(
        <>
            <div className="flex flex-col items-center ">
                <a href="/" className="self-start pl-3 pt-3">
                    <button type="button" className="text-white bg-blue-800 
                                                hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                                focus:ring-blue-300 font-medium rounded-full 
                                                text-sm p-2.5 text-center inline-flex 
                                                items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                dark:focus:ring-blue-800
                                                pr">
                        <svg className="w-5 h-5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                </a>

                <div className="flex pt-[100px] pb-5">
                    <img src={mainLogo} className="h-12 pr-3" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Sweet Home Finder</span>
                </div>

                <span className="text-3xl font-bold pb-5">Welcome!</span>

                <span className="text-2xl font-semibold text-slate-300 pb-5">Create an Account</span>
                <form onSubmit={handleSubmit}>
                    <div className="flex pb-5">
                        <img src={username} className="h-8 pr-2" alt="Logo" />

                        <input className="shadow appearance-none 
                                        border rounded w-[300px] py-2 px-3 
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline" 
                                name="name" 
                                type="text" 
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex pb-5">
                        <img src={email} className="h-9 pr-2" alt="Logo" />

                        <input className="shadow appearance-none 
                                        border rounded w-[300px] py-2 px-3 
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline" 
                                name="email" 
                                type="text" 
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex pb-5">
                        <img src={password} className="h-7 pr-2" alt="Logo" />

                        <input className="shadow appearance-none 
                                        border rounded w-[300px] py-2 px-3 
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline" 
                                name="password" 
                                type="password" 
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex pb-5">
                        <img src={password} className="h-7 pr-2" alt="Password" />

                        <input className="shadow appearance-none 
                                        border rounded w-[300px] py-2 px-3 
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline" 
                                name="confirmPassword" 
                                type="password" 
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                        />
                    </div>

                    <div className="pb-5">
                        <button 
                            type="submit"
                            className="w-[350px] h-[50px] rounded-md bg-blue-800 text-white font-bold text-2xl">Sign Up</button>
                    </div>
                </form>

                <div className="flex pb-5">
                    <span className=" font-semibold pr-12">Already have an account?</span>
                    <a href="/login">
                        <span  className="text-blue-800 font-semibold">Login</span>
                    </a>
                    
                </div>
            </div>
        </>
    );
}

export default Register