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