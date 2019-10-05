import StyleScrapper from "./StyleScrapper";

class DistanceStyleScrapper extends StyleScrapper {

    sortStyles(referenceElement) {
        const me = this;
        this.styles.sort(function (aStyle, anotherStyle) {
            return me.getDistanceBetweenElements(aStyle.element, referenceElement) -
                me.getDistanceBetweenElements(anotherStyle.element, referenceElement)
        });
    }

    getStyles(selector,elementContainer, properties, referenceElement) {
        this.scrapStyles(selector,elementContainer,properties);
        this.sortStyles(referenceElement);
        this.filterStyles();
        return this.getStylesDict();
    }



}

export default DistanceStyleScrapper;