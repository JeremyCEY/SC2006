// OverlayContentBuilder.js
import {SVGUtils} from './SVGUtils';
import {TextFormatter} from './TextFormatter';

export class OverlayContentBuilder {
    constructor(svgUrl, iconStrokeColour, iconFillColour) {
        this.svgUrl = svgUrl;
        this.iconStrokeColour = iconStrokeColour;
        this.iconFillColour = iconFillColour;
    }

    async buildContent(text, shadowOptions) {
        const titleCasedText = TextFormatter.toTitleCase(text);
        const svgContent = await SVGUtils.fetchSVG(this.svgUrl);
        const coloredSVG = SVGUtils.recolorSVG(svgContent, this.iconStrokeColour, this.iconFillColour);
        // Adding the drop shadow to the SVG
        const svgWithShadow = SVGUtils.addDropShadow(coloredSVG, shadowOptions);
        return `<span style="vertical-align: middle; margin-right: 3px;">${svgWithShadow}</span>${titleCasedText}`;
    }
}
