import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
    const mapContainerStyle = {
        width: '300%',
        height: '400px'
    };

    const center = {
        lat: 1.290270, // Latitude of map's center
        lng: 103.8198 // Longitude of map's center
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBhczWoil98rdEK_ucliVCnz7IjVmZ6KFc">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;