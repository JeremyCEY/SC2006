import React, { useState } from 'react';
import mainLogo from '../images/logo.png';

import { Layout } from "antd";


function LoggedInNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    }

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        console.log('Loggedout');
    };

    return (
        <nav className="bg-white border-gray-200 
                        sticky shadow-lg
                        top-0 z-99999
                        h-[13vh]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-8">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={mainLogo} className="h-12" alt="Logo" />
                </a>

                <button onClick={toggleDropdown} 
                    className=" text-blue-700 rounded 
                    inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg  hover:bg-gray-100 focus:outline-none 
                    md:p-0 text-black md:hover:text-blue-500 
                    ml-auto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A12.12 12.12 0 0112 15c3.159 0 6.12 1.284 8.879 2.804M12 12a5 5 0 100-10 5 5 0 000 10z" />
                    </svg>
                </button>
            </div>


            <div className={`${isDropdownOpen ? 'block' : 'hidden'} z-10 fixed 
                            sm:right-0 md:right-[1vw] lg:right-[5vw] 
                            sm:top-[12vw] md:top-[10vw] lg:top-[6vw]`}>
                <ul className="flex flex-col space-y-2 bg-white px-4
                                text-sm text-black font-medium
                                rounded-lg shadow-lg
                                border">
                    <li>
                        <a href="/dashboard" className="block px-3 py-2
                                                    bg-white mt-3
                                               hover:bg-gray-100 
                                               rounded-md">Dashboard</a>
                    </li>

                    <li>
                        <a onClick={logout} className="block px-3 py-2 
                                                        bg-white 
                                                        hover:bg-gray-100 
                                                        rounded-md">Logout</a>
                    </li>

                    <li>
                        <a href="/FAQ" className="block px-3 py-2
                                                bg-white mb-3
                                                hover:bg-gray-100 
                                                rounded-md">FAQ</a>
                    </li>

                </ul>
                                
            </div>
            
        </nav>
    );
}

export default LoggedInNavbar;
