import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios';

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
    const [mrt, setMrt] = useState(null); // Ensured state is inside the component

    // Fetch resale data
    useEffect(() => {
        axios.get('/testData') // Make sure this URL is correct and accessible
            .then(response => setResales(response.data))
            .catch(err => console.error('Failed to fetch resale data:', err));
    }, []);

    // Fetch GeoJSON data and add as a layer to the map
    useEffect(() => {
        async function fetchAndAddGeoJsonLayer() {
            if (!mrt) return; // Ensure map is loaded

            try {
                const response = await fetch('http://localhost:3000/api/geodata');
                if (!response.ok) throw new Error('Network response was not ok');

                const geoJsonData = await response.json();
                if (geoJsonData && geoJsonData.features.length > 0) {
                    mrt.data.addGeoJson(geoJsonData);
                } else {
                    console.error("GeoJSON data is empty or not in expected format");
                }
                mrt.data.addGeoJson(geoJsonData); // Add GeoJSON data to map
            } catch (error) {
                console.error("Failed to fetch GeoJSON data:", error);
            }
        }

        fetchAndAddGeoJsonLayer();
    }, [mrt]); // Effect runs when the `mrt` state changes

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD6pSI0fbs6q6bo-YXRcpxtMliZ20EQvN8" // Replace with your actual API key
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11} // Adjusted zoom for better visibility
            center={center}
            onLoad={setMrt} // Set the map instance
            options={{ mapId: "42923ec279983523" }}
        >
            {resales.map(resale => (
                <Marker key={resale.id} position={{ lat: resale.latitude, lng: resale.longitude }} />
            ))}
        </GoogleMap>
    ) : <></>;
}

export default Map;
