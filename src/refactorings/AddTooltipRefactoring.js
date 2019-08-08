import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";
import AddTooltipView from "../components/AddTooltipView";
import 'tipr/tipr/tipr.css';
import ColorPreviewer from "../previewers/ColorPreviewer";
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
            const me = this;
            this.getElement().addEventListener("mousemove", function () {
                me.applyStyles(me.getTooltipElement(), me.getStyle().tooltip);
            });

        }
    }

    setTooltipName (aTooltipName) {
        this.tooltipName = aTooltipName;
    }

    getTooltipName() {
        return this.tooltipName;
    }

    targetElements () {
        return "a, div, img, input, span, p, button";
    }

    serialize () {
        let json = super.serialize();
        json.tooltipName = this.getTooltipName();
        return json;
    }

    getView () {
        return AddTooltipView;
    }

    getTooltipElement() {
        return this.getElement().querySelectorAll(".tipr_content");
    }

    getStyledElementsQty() {
        return 1;
    }

    assignStyle(aStyle) {
        this.getStyle()["tooltip"] = aStyle[0];
    }

    clone () {
        let clonedRefactoring = super.clone();
        clonedRefactoring.setTooltipName(this.tooltipName);
        return clonedRefactoring;
    }

    static asString () {
        return "Add Tooltip";
    }

    static getPreviewer() {
        return new ColorPreviewer();
    }

    static getClassName() {
        return "AddTooltipRefactoring";
    }
}

export default AddTooltipRefactoring;


