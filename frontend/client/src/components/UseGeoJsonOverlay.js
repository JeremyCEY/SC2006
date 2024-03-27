import { useEffect } from 'react';

export const useGeoJsonOverlay = (mapRef, mrt) => {
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.data.addGeoJson(mrt);
        }
    }, [mapRef, mrt]);
};
