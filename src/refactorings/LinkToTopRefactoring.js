
import UsabilityRefactoring from "./UsabilityRefactoring";
import RefactoringPreview from "../components/RefactoringPreview";

const $ = require('jquery');

class LinkToTopRefactoring extends UsabilityRefactoring {
    constructor() {
        super();
        this.onScroll = this.onScroll.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    checkPreconditions() {
        return true;
    }

    transform() {
        this.link = document.createElement("a");
        document.body.appendChild(this.link);
        this.link.style.cssText = "display:block;position:fixed;bottom:30px;right:30px;width:35px;height:35px;cursor:pointer;background: url(https://selfrefactoring.s3.amazonaws.com/resources/refactorings/totop.png) no-repeat;display:none";
        window.addEventListener("scroll", this.onScroll);
        this.link.addEventListener("click", this.onClick);
    }

    onScroll() {
        if ($(window).scrollTop() > 0) {
            $(this.link).fadeIn();
        }
        else {
            $(this.link).fadeOut();
        }
    }

    onClick() {
        $('body,html').animate({ scrollTop: 0 }, 400);
        return false;
    }

    unDo() {
        document.body.removeChild(this.link);
        window.removeEventListener("scroll", this.onScroll);
    }

    getView() {
        return RefactoringPreview;
    }

    static asString() {
        return "Link to Top";
    }

    getDescription() {
        return "Add a link for scrolling to the top of the page that only appears when scrolling down";
    }

    getDemoResources() {
        return ["LinkToTopBefore.gif", "LinkToTopAfter.gif"];
    }

    static getCode() {
        return "<a style='display:block;position:fixed;bottom:30px;right:30px;width:35px;height:35px;cursor:pointer;background: url(https://selfrefactoring.s3.amazonaws.com/resources/refactorings/totop.png) no-repeat;display:none'></a>"
    }

}

export default LinkToTopRefactoring;