import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map'
import Explore from "../pages/Explore";


const SavedProperties = ({ userId }) => {

    const [savedProperties, setSavedProperties] = useState([]);

    
    const [residences, setResidences] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Define token state
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);

    const toggleDetails = (id) => {
        if (expandedPropertyId === id) {
            setExpandedPropertyId(null); 
        } else {
            setExpandedPropertyId(id); 
        }
    };

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
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (token && userId) {
            axios.get(`http://localhost:3000/bookmark/${userId}`, {
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
                setSavedProperties(response.data);
                return response.json();
            })
            .then(data => {
                console.log('Raw data:', data);
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


    const handleDelete = async (propertyId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/bookmark/${userId}/${propertyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            setSavedProperties(savedProperties.filter(property => property._id !== propertyId));
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };
    

    return (
        <div>
            
            {residences.map((property) => (
                <div key={property._id} className="border-b border-gray-300 p-4 w-full">
                    <div className="flex justify-between items-center">
                        <div 
                            onClick={() => toggleDetails(property._id)} 
                            className="cursor-pointer text-blue-600 font-semibold"
                        >
                            {property.town}
                        </div>
                        <button 
                            onClick={() => handleDelete(property._id)} 
                            className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                    <div className="text-gray-500">{property.flat_type} - {property.property_type}</div>
                    {expandedPropertyId === property._id && (
                        <div className="mt-4">
                            <div>Price: ${property.resale_price.toLocaleString()}</div>
                            <div>Type: {property.flat_type}</div>
                            <div>Street: {property.street_name}</div>
                            <div>Floor area: {property.floor_area_sqm} sqm</div>
                            {/* Add more Info to display if we want */}
                        </div>
                    )}
                </div>
            ))}
            <button 
                onClick={() => {/* Button for add property, does nothing now */}} 
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                + Add Property
            </button>
        </div>
    );
    
};

export default SavedProperties; 
