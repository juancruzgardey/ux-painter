
import RefactoringView from "../components/RefactoringView";
import UsabilityRefactoringOnElement from "./UsabilityRefactoringOnElement";

const $ = require('jquery');

class LinkToTopRefactoring extends UsabilityRefactoringOnElement {
    constructor() {
        super();
        this.setElement(document.body);
    }

    transform () {
        $("body").append('<a id="scroller" style="display:block;position:fixed;bottom:30px;right:30px;width:35px;height:35px;cursor:pointer;background: url(https://selfrefactoring.s3.amazonaws.com/resources/refactorings/totop.png) no-repeat;display:none"></a>');
        $(window).scroll(function() {
            if ($(this).scrollTop() > 0) { $('#scroller').fadeIn(); } else { $('#scroller').fadeOut(); }
        });
        $('#scroller').click(function() {
            $('body,html').animate({ scrollTop: 0 }, 400);
            return false;
        });

    }

    getView() {
        return RefactoringView;
    }

    static asString() {
        return "Link to Top";
    }
}

export default LinkToTopRefactoring;