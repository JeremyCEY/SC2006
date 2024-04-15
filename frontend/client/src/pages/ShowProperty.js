import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { Layout } from 'antd';


import LoggedInNavbar from '../components/LoggedInNavbar';
import LoggedOutNavbar from "../components/LoggedOutNavbar";
import Map from '../components/Map';
import SearchResultsBar from '../components/SearchResultsBar';
import ExploreRightBar from '../components/ExploreRightBar';

const { Content } = Layout;


function ShowProperty() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(token !== null);
    }, []);


    const location = useLocation();
    const selectedId = location.state.selectedId;
    const [selectedResale, setSelectedResale] = useState(null);

    useEffect(() => {
        const fetchResale = async () => {
            const response = await fetch(`http://localhost:3000/testData/${selectedId}`);
            let data = await response.json();
            console.log('Selected resale:', data);
            data={
                ...data,
                latitude: data.Latitude,
                longitude: data.Longitude,
            }
            setSelectedResale(data);
        };

        fetchResale();
    }, [selectedId]);
    
    const [selectedProperty, setSelectedProperty] = useState(true);    


    const [frequentAddresses, setFrequentAddresses] = useState([]);
    const [userId, setUserId] = useState(null); // State for user ID

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id); // Set user ID from decoded token
        }
        if (userId) {
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
                    console.log('response:', response);
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


    //for Routing
    const [selectedFrequentAddress, setSelectedFrequentAddress] = useState(null);   //For user to select a frequent address to route to
    const [travelMode, setTravelMode] = useState("TRANSIT");    //Default to travel mode: public transport
    const [travelTime, setTravelTime] = useState({ TRANSIT: '', DRIVING: '', BICYCLING: '', WALKING: '' });


    return (
        <>
            <div className='relative z-[1000]'>
                {isAuthenticated ? <LoggedInNavbar /> : <LoggedOutNavbar  />}
            </div>
            <Layout >
                <Layout>
                    <Content>
                        <Map
                            selectedResale1={selectedResale}
                            // responseData={responseData}
                            selectedFrequentAddress={selectedFrequentAddress}
                            travelMode={travelMode}
                            setTravelTime={setTravelTime}
                            travelTime={travelTime}
                            amenityTypes={[]}
                        />
                    </Content>
                </Layout>


                {/* <SearchResultsBar bookmarked={bookmarked} setBookmarked={setBookmarked} setSortOption={setSortOption} sortedData={sortedData} handleDivClick={handleDivClick} userId={userId} selectedResale={selectedResale}/> */}

                {selectedProperty && 
                    <ExploreRightBar
                        isAuthenticated={isAuthenticated}
                        frequentAddresses={frequentAddresses}
                        setSelectedFrequentAddress={setSelectedFrequentAddress} 
                        selectedFrequentAddress={selectedFrequentAddress}
                        setTravelMode={setTravelMode}
                        travelMode={travelMode}
                        travelTime={travelTime}
                    />
                }
            </Layout>

        </>
    );
}

export default ShowProperty