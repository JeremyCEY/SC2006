import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
    const mapContainerStyle = {
        width: '80vw',
        height: '80vh'
    };

    const center = {
        lat: 1.290270, // Latitude of map's center
        lng: 103.8198 // Longitude of map's center
    };

    // State to store the map instance
    const [map, setMap] = useState(null);

    // Function to fetch GeoJSON data from the backend
    const fetchGeoJsonData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/geodata');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch GeoJSON data:", error);
            return null;
        }
    };

    useEffect(() => {
         const addGeoJsonLayer = async () => {
            if (map) {
                const geoJsonData = await fetchGeoJsonData();
                if (geoJsonData) {
                    map.data.addGeoJson(geoJsonData);
                    // Assuming the backend sends a FeatureCollection,
                    // you can directly add it to the map

                    // Optional: Style the GeoJSON layer
                    /*
                    map.data.setStyle({
                        fillColor: 'green',
                        strokeColor: 'green',
                        strokeWeight: 2,
                        strokeWeight: 1,
                    });*/
                }
            }
        };
        addGeoJsonLayer();
    }, [map]); // This effect runs when the `map` state changes

    return (
        <LoadScript googleMapsApiKey="AIzaSyBhczWoil98rdEK_ucliVCnz7IjVmZ6KFc">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                onLoad={mapInstance => setMap(mapInstance)} // Set the map instance
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;