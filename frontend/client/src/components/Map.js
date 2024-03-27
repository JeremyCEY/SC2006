import React, {useEffect, useRef, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import axios from 'axios';
import {useRailNameOverlays} from './UseRailNameOverlay';
import mrtSvgURL from "../images/train_FILL0_wght400_GRAD0_opsz24.svg"
import locationSvgURL from "../images/LocationBlank.svg"

const mapContainerStyle = {
    width: '100%', // Adjusted for better layout
    height: '400px'
};

const center = {
    lat: 1.290270,
    lng: 103.8198
};

function Map() {
    const [resales, setResales] = useState([]);
    const [mrt, setMrt] = useState([]);
    const [railNames, setRailNames] = useState([]); //
    const mapRef = useRef(null);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD6pSI0fbs6q6bo-YXRcpxtMliZ20EQvN8" // Replace with your actual API key
    });

    // Fetch resale data
    useEffect(() => {
        axios.get('/testData') // Make sure this URL is correct and accessible
            .then(response => setResales(response.data))
            .catch(err => console.error('Failed to fetch resale data:', err));

        // Fetch GeoJSON data similar to resale data
        axios.get('http://localhost:3000/geodata/railnames') // Adjust URL as necessary
            .then(response => setRailNames(response.data.features)) // Assuming the data is in `features`
            .catch(err => console.error('Failed to fetch GeoJSON data:', err));

        axios.get('http://localhost:3000/geodata/mrtlines')
            .then(response => setMrt(response.data))
            .catch(err => console.error('Failed to fetch GeoJSON data for MRT station and line overlay:', err))
    }, []);


    //
    useRailNameOverlays(mapRef, railNames, mrtSvgURL, locationSvgURL, isLoaded);
    //useGeoJsonOverlay(mapRef, mrt);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11} // Adjusted zoom for better visibility
            center={center}
            onLoad={mapInstance => { mapRef.current = mapInstance; }} // Correct usage of onLoad
            options={{ mapId: "42923ec279983523" }}
        >
            {resales.map(resale => (
                <Marker key={resale.id} position={{ lat: resale.latitude, lng: resale.longitude }} />
            ))}

        </GoogleMap>
    ) : <></>;
}

export default Map;