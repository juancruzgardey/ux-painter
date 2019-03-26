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
            this.applyStyle();
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
        return this.getElement().querySelector(".tipr_content");
    }

    applyStyle() {
        const tooltipStyle = this.getStyleScrapper().getRandomStyle(this.getElement());
        const me = this;
        this.getElement().addEventListener("mousemove", function () {
            if (me.getTooltipElement()) {
                me.getTooltipElement().style.color = tooltipStyle.color;
                me.getTooltipElement().style.backgroundColor = tooltipStyle.backgroundColor;
            }
        });
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


