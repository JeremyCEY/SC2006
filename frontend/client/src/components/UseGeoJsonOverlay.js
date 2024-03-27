import { useEffect } from 'react';
import axios from 'axios';

export const useGeoJsonOverlay = (mapRef, mrt) => {
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.data.addGeoJson(mrt);
        }
    }, [mapRef, mrt]);
};
