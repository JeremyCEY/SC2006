import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
    width: '80%', // Adjusted for better layout
    height: '600px'
};

const center = {
    lat: 1.290270,
    lng: 103.8198
};

function MapAutocomplete({setSelectedPlace}) {
    const [markers, setMarkers] = useState([]);
    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD6pSI0fbs6q6bo-YXRcpxtMliZ20EQvN8",
        libraries: ['places']
    });



    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry && place.geometry.location && mapRef.current) {
            setSelectedPlace(place.formatted_address);

            // Remove previous markers
            markers.forEach(marker => marker.setMap(null));

            //Add new marker for searched location
            const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: mapRef.current,
                title: place.name
            });

            mapRef.current.panTo(place.geometry.location);
            mapRef.current.setZoom(15);

            // Update markers state with the new marker
            setMarkers([marker]);

        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

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
            <Autocomplete
                onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
                onPlaceChanged={() => onPlaceChanged()}
            >
                <input
                    type="text"
                    placeholder="Enter a frequently visited location"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                    }}
                />
            </Autocomplete>
        </GoogleMap>
    ) : <></>;
}

export default MapAutocomplete;