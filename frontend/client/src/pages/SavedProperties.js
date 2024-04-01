import React, { useState, useEffect } from 'react';
import Map from '../components/Map'
//import Test from '../components/Navbar'
import Explore from "../components/Explore";


const SavedProperties = ({ userId }) => {
    const [residences, setResidences] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && userId) {
            fetch(`http://localhost:3000/bookmark/${userId}`, {
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
                console.log('Raw data:', data);
    
                setResidences(data.bookmarks);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, [userId]);
    

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token !== null);
    }, []);

    return (
        <>
        {residences.map((resale, index) => (
            <div key={resale.id} className="card" style={{ width: '30%', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', margin: '10px' }}>
                <div className="header">
                <div className="residence-name">{resale.town}</div>
                <div className="price-range">${resale.resale_price.toLocaleString()}</div>
                </div>
                <ul className="residence-details">
                <li>Type: {resale.flat_type}</li>
                <li>Street:  {resale.street_name}</li>
                <li>Floor area:  {resale.floor_area_sqm} sqm</li>
                </ul>
            </div>
        ))}
        </>
    );
    
};

export default SavedProperties; 
