import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import axios from 'axios'

const mapContainerStyle = {
    width: '300%',
    height: '400px'
};

const center = {
    lat: 1.290270, // Latitude of map's center
    lng: 103.8198 // Longitude of map's center
};

function Map() {
    const[resales, setResales] = useState([])

    useEffect(() => {
        axios.get('/testData')
            .then(resales => setResales(resales.data))
            .catch(err => console.log(err))
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD6pSI0fbs6q6bo-YXRcpxtMliZ20EQvN8"
    })

    return isLoaded?(
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={{mapId:"42923ec279983523"}}
            >
                {resales.map(resale =>{
                    return(
                        <Marker key = {resale.id} position = {{lat: resale.latitude, lng: resale.longitude}}>
                        </Marker>)
                })}
            </GoogleMap>
        </div>
    ) : <></>
}
export default Map;

    // State to store the map instance
    const [map, setMap] = useState(null);

    // Function to fetch GeoJSON data from the backend
    const fetchGeoJsonData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/geodata');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Fetched geodata response');
            const data = await response.json();
            console.log('Create geojson object');
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

export default Map;