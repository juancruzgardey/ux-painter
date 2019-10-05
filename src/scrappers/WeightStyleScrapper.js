import StyleScrapper from "./StyleScrapper";

class WeightStyleScrapper extends StyleScrapper {


    getStyles(selector,elementContainer, properties, referenceElement) {
        this.scrapStyles(selector,elementContainer,properties);
        this.filterStyles();
        this.sortStyles(referenceElement);
        return this.getStylesDict();
    }

    sortStyles(referenceElement) {
        this.styles.sort(function (aStyle, anotherStyle) {
            return anotherStyle.weight - aStyle.weight
        });
    }
}

export default WeightStyleScrapper;