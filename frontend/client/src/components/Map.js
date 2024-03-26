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
    const [railNames, setRailNames] = useState([]); //
    const [hammerIcon, setHammerIcon] = useState({});
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD6pSI0fbs6q6bo-YXRcpxtMliZ20EQvN8" // Replace with your actual API key
    });


    useEffect(() => {
        if (isLoaded) {
            // Define the icon here to ensure 'google' is defined
            setHammerIcon({
                url: 'D:\\2006-SCSB-SCSB-T2\\frontend\\client\\src\\images\\construction_black_24dp.svg',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
            });
        }
    }, [isLoaded]);

    // Fetch resale data
    useEffect(() => {
        axios.get('/testData') // Make sure this URL is correct and accessible
            .then(response => setResales(response.data))
            .catch(err => console.error('Failed to fetch resale data:', err));


        // Fetch GeoJSON data similar to resale data
        axios.get('http://localhost:3000/geodata/railnames') // Adjust URL as necessary
            .then(response => setRailNames(response.data.features)) // Assuming the data is in `features`
            .catch(err => console.error('Failed to fetch GeoJSON data:', err));
    }, []);

    // Fetch GeoJSON data and add as a layer to the map
    useEffect(() => {
        if(mrt) {
            axios.get('http://localhost:3000/geodata/mrtlines')
                .then(response => {
                    mrt.data.addGeoJson(response.data)
                })
                .catch(err => console.error('Failed to fetch GeoJSON data for overlay:', err))
        }
    }, [mrt]); // Effect runs when the `mrt` state changes

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

            {railNames.map((feature, index) => (
                <Marker
                    key={`${feature.properties.Name}-${index}`} // Ensure uniqueness by appending index
                    position={{
                        // Correctly access the first point of the coordinates array
                        lng: feature.geometry.coordinates[0][0], // Longitude
                        lat: feature.geometry.coordinates[0][1], // Latitude
                    }}
                    icon={hammerIcon}
                    label={{
                        text: feature.properties.Name, // Displaying the name next to the hammer icon
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                    }}
                />
            ))}

        </GoogleMap>
    ) : <></>;
}

export default Map;