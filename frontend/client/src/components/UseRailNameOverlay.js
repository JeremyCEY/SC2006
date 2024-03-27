/* global google */

import {useEffect} from "react";

export const useRailNameOverlays = (mapRef, railNames, svgURL, isLoaded) => {
    useEffect(() => {
        let overlays = []; // To keep track of all overlays
        let uniqueNames = new Set(); // To keep track of unique rail names

        // Immediately-invoked async function inside useEffect
        (async () => {
            if (mapRef.current && railNames.length > 0 && isLoaded) {
                try {
                    // Dynamically import the RailNameOverlay module
                    const { RailNameOverlay } = await import('./RailNameOverlay');
                    // Filter for unique rail names
                    const uniqueRailNames = railNames.filter(feature => {
                        const isUnique = !uniqueNames.has(feature.properties.Name);
                        if (isUnique) {
                            uniqueNames.add(feature.properties.Name);
                        }
                        return isUnique;
                    });

                    uniqueRailNames.forEach(feature => {
                        const position = {
                            lat: feature.geometry.coordinates[0][1],
                            lng: feature.geometry.coordinates[0][0],
                        };
                        // Instantiate a new RailNameOverlay for each feature
                        const overlay = new RailNameOverlay(mapRef.current, position, feature.properties.Name, svgURL);

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
    }, [mapRef, railNames, svgURL, isLoaded]); // Dependencies for useEffect
};
