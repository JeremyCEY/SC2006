import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
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

function Map({ responseData, selectedResale1, selectedFrequentAddress }) {
    // useEffect(() => {
    //     console.log(selectedResale1);
    // }, [selectedResale1]);
    const [response, setResponse] = useState(null);
    const [destination, setDestination] = useState('');

    const [resales, setResales] = useState([]);
    const [mrt, setMrt] = useState([]);
    const [railNames, setRailNames] = useState([]); //
    const mapRef = useRef(null);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD6pSI0fbs6q6bo-YXRcpxtMliZ20EQvN8",
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

    useEffect(() => {
        axios.get('/testData') // Make sure this URL is correct and accessible
            .then(response => setResales(response.data))
            .catch(err => console.error('Failed to fetch resale data:', err));

        // Fetch GeoJSON data similar to resale data
        axios.get('geodata/railnames') // Adjust URL as necessary
            .then(response => setRailNames(response.data.features)) // Assuming the data is in `features`
            .catch(err => console.error('Failed to fetch GeoJSON data:', err));

        axios.get('geodata/mrtlines')
            .then(response => setMrt(response.data))
            .catch(err => console.error('Failed to fetch GeoJSON data for MRT station and line overlay:', err))
    }, []);

    //
    //useRailNameOverlays(mapRef, railNames, mrtSvgURL, locationSvgURL, isLoaded);
    //useGeoJsonOverlay(mapRef, mrt);

    //For Routing:

    const [directionsRequested, setDirectionsRequested] = useState(false); // Track whether directions have been requested

    useEffect(() => {
        setDestination(String(selectedFrequentAddress));
        setDirectionsRequested(true);
    }, [selectedFrequentAddress]);

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response);
            } else {
                console.log('Directions request failed due to ' + response.status);
            }
            setDirectionsRequested(false);
        }
    };

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
            {/* {
                    responseData.map(resale => (
                        
                        <Marker
                            key={resale.id}
                            position={{ lat: parseFloat(resale.latitude), lng: parseFloat(resale.longitude) }}
                            // clusterer={clusterer}
                            onClick={() => handleMarkerClick(resale)}
                        >

                            {selectedResale === resale && (
                                <InfoWindow onCloseClick={handleCloseInfoWindow}>
                                    <div>
                                        <p>Address: {resale.street_name + " " + resale.block_no}</p>
                                        <p>Price: {"$" + resale.resale_price}</p>
                                    </div>
                                </InfoWindow>
                            )}

                        </Marker>
                    ))
                    } */}
            {selectedResale1 && (

                <Marker
                    key={selectedResale1}
                    position={{ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) }}
                    // clusterer={clusterer}
                    onClick={() => handleMarkerClick(selectedResale1)}
                >
                    {directionsRequested && (
                        <DirectionsService
                            options={{
                                destination: destination,
                                origin: ({ lat: parseFloat(selectedResale1.latitude), lng: parseFloat(selectedResale1.longitude) }),
                                travelMode: 'TRANSIT',
                            }}
                            callback={directionsCallback}
                        />
                    )}
                    {response !== null && <DirectionsRenderer directions={response} />}

                    {response && (                  //idk how to display this
                        <div>
                            <p>Travel Time: {response.routes[0].legs[0].duration.text}</p>
                        </div>
                    )}

                    {selectedResale === selectedResale1 && (
                        <InfoWindow onCloseClick={handleCloseInfoWindow}>
                            <div>
                                <p>Address: {selectedResale1.street_name + " " + selectedResale1.block_no}</p>
                                <p>Price: {"$" + selectedResale1.resale_price}</p>
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            )}
        </GoogleMap >
    ) : <></>;
}

export default Map;