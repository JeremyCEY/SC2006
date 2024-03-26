//UseRailNameOverlays.js
/* global google */

import { useEffect } from "react";

export const useRailNameOverlays = (mapRef, railNames, hammerSvgURL, isLoaded) => {
    useEffect(() => {
        let overlays = []; // To keep track of all overlays
        // Immediately-invoked async function inside useEffect
        (async () => {
            if (mapRef.current && railNames.length > 0 && isLoaded) {
                try {
                    // Dynamically import the RailNameOverlay module
                    const { RailNameOverlay } = await import('./RailNameOverlay');
                    railNames.forEach(feature => {
                        const position = {
                            lat: feature.geometry.coordinates[0][1],
                            lng: feature.geometry.coordinates[0][0],
                        };
                        // Instantiate a new RailNameOverlay for each feature
                        const overlay = new RailNameOverlay(mapRef.current, position, feature.properties.Name, hammerSvgURL);

                        overlays.push(overlay);
                        //overlay.hide();
                    });
                } catch (error) {
                    // Handle any errors that occur during the import or overlay creation
                    console.error("Failed to initialize overlays:", error);
                }

                // Adjust overlay visibility based on zoom level
                google.maps.event.addListener(mapRef.current, 'zoom_changed', () => {
                    const currentZoom = mapRef.current.getZoom();
                    overlays.forEach(overlay => {
                        if (currentZoom > 13) { // Adjust this threshold as needed
                            overlay.show();
                        } else {
                            overlay.hide();
                        }
                    });
                });

                // Cleanup
                return () => {
                    google.maps.event.clearListeners(mapRef.current, 'zoom_changed');
                    overlays.forEach(overlay => overlay.setMap(null));
                };
            }
        })();
    }, [mapRef, railNames, hammerSvgURL, isLoaded]); // Dependencies for useEffect
};
