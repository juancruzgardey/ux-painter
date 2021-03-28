import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";

class AddProcessingPageRefactoring extends UsabilityRefactoringOnElement {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        document.querySelector("#overlay").style.display = "";
        const me = this;
        setTimeout(function () {
            me.getElement().submit();
        }, 1);
    }

    unDo() {
        this.button.parentNode.removeChild(this.button);
        this.submit.style.display = "";
    }

    transform() {
            let overlay = document.createElement("div");
            overlay.id = "overlay";
            overlay.textContent = "Loading...";
            overlay.style.cssText = "font-size:2em;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;z-index:9998;padding:100px 50%";
            overlay.style.display="none";
            document.body.appendChild(overlay);

            this.submit = this.getElement().querySelector("[type='submit']");

            let submitCSS = this.styleScrapper.getElementComputedStyle(this.submit);
            this.button = this.submit.cloneNode(true);
            this.button.setAttribute("type", "button");
            this.styleScrapper.updateElementStyle(this.button,submitCSS);
            this.button.addEventListener("click", this.onClick);
            this.submit.style.display = "none";
            this.submit.parentNode.insertBefore(this.button, this.submit);
    }

    targetElements() {
        return "form";
    }

    static asString() {
        return "Add Loading Overlay";
    }

    static getClassName() {
        return "AddProcessingPageRefactoring";
    }

    getDescription() {
        return "";
    }

    codeAvaiable() {
        return false
    }
}

export default AddProcessingPageRefactoring;