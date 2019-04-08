import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import AddTooltipView from "../components/AddTooltipView";
import 'tipr/tipr/tipr.css';
const $ = require('jquery');
window.jQuery = $;
global.jQuery = $;
require('tipr');


class AddTooltipRefactoring extends UsabilityRefactoringOnElement {

    transform () {
        if (this.getElement() !== undefined) {
            this.getElement().className += " tip";
            this.getElement().setAttribute("data-tip", this.tooltipName);

            $(this.getElement()).tipr();
            this.scrapStyles();
            const me = this;
            this.getElement().addEventListener("mousemove", function () {
                me.applyStyles();
            });

        }
    }

    setTooltipName (aTooltipName) {
        this.tooltipName = aTooltipName;
    }

    targetElements () {
        return "a, div, img, input, span, p, button";
    }

    serialize () {

    }

    getView () {
        return AddTooltipView;
    }

    getTooltipElement() {
        return this.getElement().querySelectorAll(".tipr_content");
    }

    scrapStyles() {
        this.styles = [];
        const tooltipStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        this.styles.push({element: "getTooltipElement", style: tooltipStyle});


    }

    clone () {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setTooltipName(this.tooltipName);
        return clonedRefactoring;
    }

    static asString () {
        return "Add Tooltip";
    }
}

export default AddTooltipRefactoring;


/**AddTooltipRefactoring.prototype.serialize = function () {
    var json = UsabilityRefactoringOnElement.prototype.serialize.call(this);
    json.tooltip = this.tooltipName;
    return json;
}

*/


