
class StyleScrapper {

    constructor() {
        this.styles = [];
    }

    scrapStyles(selector,elementContainer, properties) {
        this.styles = [];
        const allElements = elementContainer.querySelectorAll(selector);
        for (let i = 0; i < allElements.length; i++) {
            let newStyle = {};
            for (let j = 0; j < properties.length; j++) {
                newStyle[properties[j]] = window.getComputedStyle(allElements[i]).getPropertyValue(properties[j]);
            }
            this.styles.push({element: allElements[i], style: newStyle});
        }
        return this.styles;
    }

    areStylesEquals (aStyle, anotherStyle) {
        let equals = true;
        Object.keys(aStyle).forEach(function (key) {
            if (anotherStyle[key] && aStyle[key] != anotherStyle[key]) {
                equals = false;
            }
        });
        return equals;
    }

    filterStyles() {
        let filteredStyles = [];
        const me = this;
        for (let i = 0; i < this.styles.length; i++) {
            let existingStyles = filteredStyles.filter(function (style) {
                return me.areStylesEquals(me.styles[i].style, style.style);
            });
            if (existingStyles.length == 0) {
                this.styles[i]["weight"] = 0;
                filteredStyles.push(this.styles[i]);
            }
            else {
                existingStyles[0]["weight"] += 1;
            }
        }
        this.styles = filteredStyles;
    }

    sortStyles(styles) {
    }

    getStylesDict() {
        return this.styles.map(function (style) {
            return style.style;
        })
    }

    getStyles(selector,elementContainer, properties, referenceElement) {
        this.scrapStyles(selector,elementContainer,properties);
        return this.getStylesDict();
    }


    getDistanceBetweenElements(element, anotherElement) {
        const elementCenter = this.getElementCenterPoint(element);
        const anotherElementCenter = this.getElementCenterPoint(anotherElement);

        const distanceSquared = Math.pow(elementCenter[0] - anotherElementCenter[0], 2) +
            Math.pow(elementCenter[1] - anotherElementCenter[1], 2);

        return Math.sqrt(distanceSquared);

    }

    getElementCenterPoint(element) {
        const elementRect = element.getBoundingClientRect();
        const elementX = elementRect.left + elementRect.width / 2;
        const elementY = elementRect.top + elementRect.height/ 2;
        return [elementX, elementY];

    }

    getElementComputedStyle (element) {
        return Object.assign({}, window.getComputedStyle(element));
    }

    updateElementStyle (targetElement, computedStyle) {
        Object.keys(computedStyle).forEach(function(key) {
            return targetElement.style.setProperty(key, computedStyle[key], targetElement.style.getPropertyPriority(key));
        });
    }


}

export default StyleScrapper;