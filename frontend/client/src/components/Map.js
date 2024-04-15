import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer, Circle, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { useRailNameOverlays } from './UseRailNameOverlay';
import mrtSvgURL from "../images/train_FILL0_wght400_GRAD0_opsz24.svg"
import locationSvgURL from "../images/LocationBlank.svg"

const mapContainerStyle = {
    width: '100vw', // Adjusted for better layout
    height: '87vh'
};

const center = {
    lat: 1.350270,
    lng: 103.8198
};

const libraries = ['places'];

function Map({ responseData, selectedResale1, selectedFrequentAddress, travelMode, setTravelTime, amenityTypes }) {
    const [response, setResponse] = useState(null);
    const [destination, setDestination] = useState('');

    const [resales, setResales] = useState([]);
    const [mrt, setMrt] = useState([]);
    const [railNames, setRailNames] = useState([]); //
    const mapRef = useRef(null);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDLCMSp9E0LVe8-nZbxQwORyFHLULTrIXA",
        libraries: libraries
    });

    //pans and zoom when different properties are selected
    useEffect(() => {
        if (mapRef.current && selectedResale1) {
            mapRef.current.panTo({
                lat: parseFloat(selectedResale1.latitude),
                lng: parseFloat(selectedResale1.longitude)
            });
            mapRef.current.setZoom(15); // Set your desired zoom level here

        }
    }, [selectedResale1]);


    const [selectedResale, setSelectedResale] = useState(null);

    const handleMarkerClick = (resale) => {
        setSelectedResale(resale);
    };

    const handleCloseInfoWindow = () => {
        setSelectedResale(null);
    };


    useRailNameOverlays(mapRef, railNames, mrtSvgURL, locationSvgURL, isLoaded);
    //useGeoJsonOverlay(mapRef, mrt);

    //For Routing:

    const [directionsRequested, setDirectionsRequested] = useState(false); // Track whether directions have been requested

    useEffect(() => {
        if (selectedFrequentAddress !== null) {
            setDestination(String(selectedFrequentAddress));
            setDirectionsRequested(true);
        }
    }, [selectedFrequentAddress, selectedResale1, travelMode]);

    const directionsCallback = (response) => {
        if (response !== null && response.status === 'OK') {
            setResponse(response);
            setDirectionsRequested(false);
            // setTravelTime(response.routes[0].legs[0].duration.text)
        } else {
            console.log('Directions request failed due to ' + response?.status);
        }
    };

    //set travel time for all modes
    useEffect(() => {
        if (selectedFrequentAddress !== null) {
            // Make a request for each transport mode
            ['DRIVING', 'TRANSIT', 'WALKING', 'BICYCLING'].forEach(mode => {
                const DirectionsService = new window.google.maps.DirectionsService();
                DirectionsService.route({
                    origin: ({ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) }),
                    destination: destination,
                    travelMode: mode,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        // Set the travel time for the current mode
                        setTravelTime(prevState => ({ 
                            ...prevState, 
                            [mode]: result.routes[0].legs[0].duration.text 
                        }));
                        // console.log(`Travel time for ${mode}: ${result.routes[0].legs[0].duration.text}`);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            });
        }
    }, [destination, selectedResale1]);

    // Routing funcs end

    //amenity searching
    const [amenities, setAmenities] = useState([]);
    const [circleCenter, setCircleCenter] = useState(null);
    const [circleRadius, setCircleRadius] = useState(500);

    const [showAmenities, setShowAmenities] = useState(false);


    useEffect(() => {
        if (isLoaded && selectedResale1 !== null) {
            // Fetch amenities when the map is loaded
            setCircleCenter({ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) });
            fetchAmenities({ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) });
            // console.log(showAmenities);
        }
    }, [isLoaded, selectedResale1, showAmenities, amenityTypes]);


    const fetchAmenities = async (location) => {
        const service = new window.google.maps.places.PlacesService(mapRef.current);
        const request = {
            location: location,
            radius: 500,
            type: amenityTypes
        };
    
        console.log('Amenity Types', amenityTypes);
    
        if (amenityTypes.length > 0) {
            try {
                const results = await new Promise((resolve, reject) => {
                    service.nearbySearch(request, (results, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                            resolve(results);
                        } else {
                            reject(status);
                        }
                    });
                });
    
                console.log('Results', results);
                const filteredResults = results.filter(amenity => amenity.types.some(type => amenityTypes.includes(type)));
                console.log('Filtered Results', filteredResults);
                setAmenities(filteredResults);
                setShowAmenities(true); 
    
            } catch (error) {
                console.error('Error fetching amenities:', error);
                setAmenities([]);
                setShowAmenities(false);
            }
        } else {
            setShowAmenities(false); 
        }
    };


    const processedAmenities = amenities.map(amenity => {
        let iconUrl;
        switch (amenity.types[0]) {
            case 'restaurant':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet.svg';
                break;
            case 'primary_school':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/school_pinlet.svg';
                break;
            case 'secondary_school':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/school_pinlet.svg';
                break;
            case 'food':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet.svg';
                break;
            case 'park':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/tree_pinlet.svg';
                break;
            case 'supermarket':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/shoppingcart_pinlet.svg'
                break;
            case 'shopping_mall':
                iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet.svg'
                break;
            default:
                iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png'; // Replace with default icon URL
                break;
        }
        // console.log(amenity.types);
        // Return amenity object with additional 'iconUrl' property
        return { ...amenity, iconUrl };
    });


    //amenity searching end

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12} // Adjusted zoom for better visibility
            center={center}
            onLoad={mapInstance => { mapRef.current = mapInstance; }} // Correct usage of onLoad
            options={{ mapId: "42923ec279983523" }}
        >
            {selectedResale1 && (

                <Marker
                    key={selectedResale1}
                    position={{ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) }}
                    // clusterer={clusterer}
                    onClick={() => handleMarkerClick(selectedResale1)}
                >
                    {selectedResale === selectedResale1 && (
                        <InfoWindow onCloseClick={handleCloseInfoWindow}>
                            <div>
                                <p>Address: {selectedResale1.street_name + " Blk " + selectedResale1.block_no}</p>
                                <p>Price: {"$" + selectedResale1.resale_price}</p>
                            </div>
                        </InfoWindow>
                    )}

                    <Circle center={circleCenter} radius={circleRadius}></Circle>
                    {showAmenities}

                    {directionsRequested && (               //routing stuff
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: ({ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) }),
                                travelMode: travelMode,
                            }}
                            callback={directionsCallback}
                        />
                    )}
{response &&(
                    <DirectionsRenderer directions={response} />
)}

                    {response && (                  //idk how to display this
                        <div>
                            <p>Travel Time: {response.routes[0].legs[0].duration.text}</p>
                        </div>
                    )}
                </Marker>
            )}
            {showAmenities && (processedAmenities.map((amenity, index) => (
                <Marker
                    key={index}
                    position={{ lat: amenity.geometry.location.lat(), lng: amenity.geometry.location.lng() }}
                    icon={{
                        url: amenity.iconUrl,
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />
            )))}
        </GoogleMap >
    ) : <></>;
}

export default Map;