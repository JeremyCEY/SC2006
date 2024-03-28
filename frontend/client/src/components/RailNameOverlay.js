/* global google */
export class RailNameOverlay extends google.maps.OverlayView {
    constructor(map, position, text, iconURL) {
        super();
        // Convert position to a LatLng object.
        this.position = new google.maps.LatLng(position.lat, position.lng);
        this.text = text;
        // Transform text to title case
        this.text = this.toTitleCase(text);
        // Create a div element for the label.
        this.labelDiv = document.createElement('div');
        this.visible = true;
        this.labelDiv.style.position = 'absolute';
        this.labelDiv.style.display = 'flex'; // Use flexbox layout
        this.labelDiv.style.alignItems = 'center'; // Align items in the middle vertically
        this.labelDiv.style.whiteSpace = 'nowrap';
        this.labelDiv.style.background = "transparent";
        this.labelDiv.style.color = 'black';
        this.labelDiv.style.fontSize = '14px';
        this.labelDiv.style.fontWeight = 'bold';
        this.labelDiv.style.fontFamily = 'Roboto, Arial, sans-serif';
        this.labelDiv.style.webkitTextStroke = '0.5px white';
        this.labelDiv.style.textStroke = '0.5px white'; // For compatibility with non-webkit browsers
        this.labelDiv.style.textShadow = 'none';
        //this.labelDiv.style.textShadow = '2px 2px 4px #000000'; // Drop shadow
        // Correct usage of hammerSvgURL in the template literal.
        this.labelDiv.innerHTML = `<img src="${iconURL}" style="vertical-align: middle; margin-right: 5px;" alt=""> ${this.text}`;
        // Add the overlay to the map.
        this.setMap(map);
        //this.hide();
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
        this.visibile = false;
    }

    // Function to show the overlay
    show() {
        if (this.labelDiv) {
            this.labelDiv.style.visibility = 'visible';
        }
        this.visibile = true;
    }

    toTitleCase(str) {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}
