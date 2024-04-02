import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map'
//import Test from '../components/Navbar'
import Explore from "../pages/Explore";


const Settings = ({ userId }) => {

    const [savedProperties, setSavedProperties] = useState([]);

    
    const [residences, setResidences] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Define token state

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsAuthenticated(storedToken !== null);
        setToken(storedToken); // Set token state
    }, []);

    


    return (
        <>
            <div className='flex flex-col'>
                <span>Name</span>
                <span>Change Name</span>
                <span>Email</span>
                <span>Change Email</span>
                <span>Change password</span>
            </div>  
        </>
    );
    
};

export default Settings; 
