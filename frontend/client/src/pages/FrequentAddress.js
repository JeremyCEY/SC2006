import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map'
import Explore from "../components/Explore";

const FrequentLocations = ({ userId }) => {
    const [frequentAddresses, setFrequentAddresses] = useState([]);
    const [expandedLocationId, setExpandedLocationId] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsAuthenticated(storedToken !== null);
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && userId) {
            fetch(`http://localhost:3000/frequentaddress/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Frequent addresses:', data);
                setFrequentAddresses(data); 
            })
            .catch(error => {
                console.error('Error fetching frequent addresses:', error);
            });
        }
    }, [userId]);

    const toggleDetails = (id) => {
        setExpandedLocationId(expandedLocationId === id ? null : id);
    };

    return (
        <div className="w-full">
            {frequentAddresses.map((address, index) => (
                <div key={index} className="border-b border-gray-300 p-4 w-full flex justify-between items-center">
                    <div className="cursor-pointer text-blue-600 font-semibold" onClick={() => {/* click to show addr, same as UI mock */}}>
                        {address}
                    </div>
                    <button 
                        onClick={() => {/* Delete button */}} 
                        className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => {/* EDit button */}} 
                        className="text-white bg-blue-300 hover:bg-blue-500 font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                </div>
            ))}
            <button 
                onClick={() => {/* Button for add Location, does nothing now */}} 
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                + Add Location
            </button>
        </div>
    );
};

export default FrequentLocations;
