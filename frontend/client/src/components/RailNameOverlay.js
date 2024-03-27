/* global google */
import {OverlayContentBuilder} from './OverlayContentBuilder';

export class RailNameOverlay extends google.maps.OverlayView {
    constructor(map, position, text, iconURL) {
        super();
        this.map = map;
        this.text = text;
        this.color = "blue";
        // Convert position to a LatLng object.
        this.position = new google.maps.LatLng(position.lat, position.lng);
        this.overlayContentBuilder = new OverlayContentBuilder(iconURL, this.color, this.color);
        this.labelDiv = document.createElement('div');
        this.initializeOverlay(text);
    }

    async initializeOverlay(text) {
        const content = await this.overlayContentBuilder.buildContent(text, this.getshadowOptions());
        this.setupLabelDiv(content);
        this.setMap(this.map);
    }

    setupLabelDiv(content) {
        // Apply common styles from getStyle method
        const styles = this.getStyle();
        Object.keys(styles).forEach(key => {
            this.labelDiv.style[key] = styles[key];
        });
        //this.labelDiv.style.webkitTextStroke = '0.5px white';
        //this.labelDiv.style.textStroke = '0.5px white';
        this.labelDiv.innerHTML = content;


    }

    // Options for the drop shadow
    getshadowOptions() {
        return {
            stdDeviation: 2, // Less blur
            dx: 0, // Horizontal offset to the right
            dy: 0, // Vertical offset downwards
            color: "rgba(255, 255, 255, 0.6)" // Semi-transparent white color}
        }
    }

    getStyle() {
        return {
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            background: 'transparent',
            color: 'black',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Roboto, Arial, sans-serif',
            visibility: 'visible',
            textShadow: 'none', // Example of setting text shadow; adjust as needed
            webkitTextStroke: '0.2px white',
            textStroke: '0.2px white' // For compatibility with non-webkit browsers
        }
        //textShadow = '2px 2px 4px #000000'; // Drop shadow
    }

    draw() {
        const overlayProjection = this.getProjection();
        // Use the projection to calculate the correct position of the overlay.
        const sw = overlayProjection.fromLatLngToDivPixel(this.position);
        this.labelDiv.style.left = `${sw.x}px`;
        this.labelDiv.style.top = `${sw.y}px`;

        const panes = this.getPanes();
        panes.overlayLayer.appendChild(this.labelDiv);
    }

    onRemove() {
        if (this.labelDiv) {
            this.labelDiv.parentNode.removeChild(this.labelDiv);
            this.labelDiv = null;
        }
    }

    // Function to hide the overlay
    hide() {
        if (this.labelDiv) {
            this.labelDiv.style.visibility = 'hidden';
        }
    }

    // Function to show the overlay
    show() {
        if (this.labelDiv) {
            this.labelDiv.style.visibility = 'visible';
        }
    }
}
