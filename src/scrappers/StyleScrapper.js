class StyleScrapper {

    constructor() {
        this.contrastRatioThreshold = 3;
        this.elementsQtyThreshold = 10;
    }

    /**
     * Return a list of dictionaries with leaf elements.
     */
    getLeafElements () {
        let elementsStyle = [];
        const allTextElements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a, button, input[type='submit']");
        for (let i = 0; i < allTextElements.length; i++) {
            const color = window.getComputedStyle(allTextElements[i]).getPropertyValue("color");
            const backgroundColor = this.getElementBackGroundColor(allTextElements[i]);

            if (this.getContrastRatio(backgroundColor,color) > this.contrastRatioThreshold) {
                let elementStyle = {
                    "element": allTextElements[i],
                    "color": color,
                    "fontFamily": window.getComputedStyle(allTextElements[i]).getPropertyValue("font=family"),
                    "backgroundColor": backgroundColor
                };
                elementsStyle.push(elementStyle);
            }
        }
        return elementsStyle;
    }

    existsElementWithStyle(elementStyle, elementsCollection) {
        let found = false;
        for (let i = 0; (i < elementsCollection.length && !found); i++) {
            if (elementsCollection[i].color == elementStyle.color &&
                elementsCollection[i].backgroundColor == elementStyle.backgroundColor) {
                found = true;
            }
        }
        return found;
    }

    getElementBackGroundColor(element) {
        let currentElement = element;
        while (window.getComputedStyle(currentElement).getPropertyValue("background-color") == "rgba(0, 0, 0, 0)"
            && currentElement != document.body) {
            currentElement = currentElement.parentNode;
        }
        return  currentElement != document.body ? window.getComputedStyle(currentElement).getPropertyValue("background-color"):"rgb(0, 0, 0)";
    }

    getColorLuminance(color) {
        var a = color.map(function (v) {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow( (v + 0.055) / 1.055, 2.4 );
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    getContrastRatio(aColor, anotherColor) {
        return (this.getColorLuminance(this.parseColor(aColor)) + 0.05) /
            (this.getColorLuminance(this.parseColor(anotherColor)) + 0.05);
    }

    parseColor(colorString) {
        let rgb = colorString.replace(/[^\d,]/g, '').split(',');
        rgb[0] = parseInt(rgb[0]);
        rgb[1] = parseInt(rgb[1]);
        rgb[2] = parseInt(rgb[2]);
        return rgb;


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
    
    getLeafElementsByDistance(element) {
        let allLeafElements = this.getLeafElements();
        const me = this;
        allLeafElements.sort(function (a, b) {
            return me.getDistanceBetweenElements(element, b.element) - me.getDistanceBetweenElements(element, a.element);
        });
        return allLeafElements;
    }

    getRandomStyle(element) {
        var nearestElements = this.getLeafElementsByDistance(element).slice(0, this.elementsQtyThreshold);
        return nearestElements[Math.floor(Math.random() * nearestElements.length)];
    }

    getElementComputedStyle (anElement) {
        return Object.assign({}, window.getComputedStyle(anElement));
    }

    updateElementStyle (targetElement, computedStyle) {
        Object.keys(computedStyle).forEach(function(key) {
            return targetElement.style.setProperty(key, computedStyle[key], targetElement.style.getPropertyPriority(key));
        });
    }


}

export default StyleScrapper;