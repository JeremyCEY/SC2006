import React, { useState, useEffect } from 'react';

const SavedProperties = ({ userId }) => {

    const [savedProperties, setSavedProperties] = useState([]);
    const [residences, setResidences] = useState([]);
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [propertiesExist, setSavedPropertiesExist] = useState(false);

    const toggleDetails = (id) => {
        if (expandedPropertyId === id) {
            setExpandedPropertyId(null); 
        } else {
            setExpandedPropertyId(id); 
        }
    };    

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
                    if(response.status === 404) {
                        setSavedPropertiesExist(false);
                        throw new Error('No properties saved');
                    }
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setSavedProperties(data);
                    setSavedPropertiesExist(data.length > 0);
                    return Promise.all(data.map(id => {
                        return fetch(`http://localhost:3000/testData/${id}`, {
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
                    }));
                })
                .then(residencesData => {
                    setResidences(residencesData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [userId, savedProperties]);
    

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
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };
    
    return (
        <div className='w-full overflow-y-auto h-[87vh]'>
            {!propertiesExist ? (
                <div>No properties saved</div>
            ) : (
                residences.map((property) => (
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
                        <div className="text-gray-500">{property.flat_type} {property.property_type}</div>
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
                ))
            )}
        </div>
    );
    
};

export default SavedProperties; 