import React, { useState, useEffect } from 'react';

import homeImage from "../images/home.png"
import LoggedOutNavbar from "../components/LoggedOutNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar";

function Home(){
    const [residences, setResidences] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/resale') 
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setResidences(data.slice(0, 6)); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token !== null);
    }, []);

    return(
        <>
            {isAuthenticated ? <LoggedInNavbar/> : <LoggedOutNavbar/>}
            <div className="flex flex-col items-center">
                <div className="relative pt-10 pb-10 pl-5 pr-5">
                    <img src={homeImage} className="w-full" alt="Home"/>
                    
                    <div className="absolute
                            top-[calc(50%+30px)] left-1/2
                            transform -translate-x-1/2 -translate-y-1/2 
                            text-center text-white 
                            bg-black bg-opacity-30 p-5 rounded z-10">
                    <h2 className="text-3xl font-bold pb-2">Discover through Amenities</h2>
                    <p className="text-base">Your dream home location should cater to your lifestyle. Find homes near Gyms, Schools, Shopping Centres, new MRT lines, and more...</p>
                    </div>
                </div>
                
                <div className="w-full p-4">
                    <h2 className="font-bold text-3xl text-center mb-6">Explore Residences</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {residences.map((resale, index) => (
                            <div key={resale.id}
                                // className= "w-[30%], p-[20px], shadow-md, m-[10px]"
                                style={{ width: '30%', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', margin: '10px' }}>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home