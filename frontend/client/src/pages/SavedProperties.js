import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map'
//import Test from '../components/Navbar'
import Explore from "../components/Explore";


const SavedProperties = ({ userId }) => {

    const [savedProperties, setSavedProperties] = useState([]);

    
    const [residences, setResidences] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Define token state

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsAuthenticated(storedToken !== null);
        setToken(storedToken); // Set token state
    }, []);

    

    // useEffect(() => {        
       
    //     const storedToken = localStorage.getItem('token');
    //     axios.get(`http://localhost:3000/bookmark/${userId}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //         })
    //         .then(response => {
    //             setSavedProperties(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }, []);

    //retrieve id of saved properties from bookmark
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
                // Map over each ID and fetch details
                Promise.all(data.map(id => {
                    return fetch(`http://localhost:3000/resale/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    });
                }))
                .then(residencesData => {
                    console.log('Residences data:', residencesData);
                    setResidences(residencesData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching bookmark data:', error);
            });
        }
    }, [userId]);

    //retrieve object of resale based on id
    

    return (
        <>
        {residences.map(property => (
            <div key={property._id}>
                <div className="header">
                    <div className="residence-name">{property.town}</div>
                    <div className="price-range">${property.resale_price.toLocaleString()}</div>
                </div>
                <ul className="residence-details">
                    <li>Type: {property.flat_type}</li>
                    <li>Street: {property.street_name}</li>
                    <li>Floor area: {property.floor_area_sqm} sqm</li>
                </ul>
            </div>
        ))}
    </>
    );
    
};

export default SavedProperties; 
