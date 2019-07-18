class DOMElementWrapper {

    constructor(domElement) {
        this.domElement = domElement;
        if (domElement.getAttribute("data-uxpainter-id")) {
            this.id = domElement.getAttribute("data-uxpainter-id");
        }
        else {
            this.id = Math.random().toString(36).substring(2, 15);
            domElement.setAttribute("data-uxpainter-id", this.id);
        }
    }

    findElement (anElement) {
        return  this.domElement == anElement.domElement || this.domElement.querySelector("[data-uxpainter-id='" + anElement.id + "']");
    }

    getParent() {
        return new DOMElementWrapper(this.domElement.parentNode);
    }

    ancestor(anotherElement) {
        if (this.findElement(anotherElement)) {
            return this;
        }
        else {
            return this.getParent().ancestor(anotherElement);
        }
    }

    getNumberOfHops(anotherElement) {
        if (this.domElement == anotherElement.domElement) {
            return 0;
        }
        else {
            return 1 + this.getParent().getNumberOfHops(anotherElement);
        }
    }

    shortestPath(anotherElement) {
        let ancestor = this.ancestor(anotherElement);
        return this.getNumberOfHops(ancestor) + anotherElement.getNumberOfHops(ancestor);
    }

    getCenter() {
        const rectangle = this.domElement.getBoundingClientRect();
        return {"x": (rectangle.left + rectangle.width) / 2, "y": (rectangle.top + rectangle.height) / 2};
    }

    getDistance (anotherElement) {
        const centerA = this.getCenter();
        const centerB = anotherElement.getCenter();
        return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2));
    }

    equals(anotherElement) {
        return this.domElement == anotherElement.domElement;
    }

}

class PageSegment {

    constructor(domElement) {
        if (domElement) {
            this.domElement = new DOMElementWrapper(domElement);
        }
    }

    getDistance (anotherSegment) {
        return this.domElement.getDistance(anotherSegment.domElement);
    }

    equals(anotherSegment) {
        return this.domElement.equals(anotherSegment.domElement);
    }

    findElement(aDOMElement) {
        return this.domElement.findElement(aDOMElement);
    }

    contains(anotherSegment) {
        return this.domElement.findElement(anotherSegment.domElement);
    }

    merge (anotherSegment) {
        let ancestor = this.domElement.ancestor(anotherSegment.domElement);
        let mergedSegment = new PageSegment();
        mergedSegment.domElement = ancestor;
        return mergedSegment;
    }

}

class PageSegmentator {

    constructor () {
        this.distanceThreshold = 160;
    }

    getInitialSegments() {
        let allCandidateLeaves = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,input,i,label,strong");
        this.segments = [];
        for (let i=0; i < allCandidateLeaves.length; i++) {
            if (allCandidateLeaves[i].children.length == 0) {
                this.segments.push(new PageSegment (allCandidateLeaves[i]));
            }
        }
        return this.segments;

    }

    findPageSegmentsByDistance () {
        if (this.segments) {
            return this.segments;
        }
        this.getInitialSegments();
        let merged = true;
        while (merged) {
            merged = false;
            for (var j = 0; j < this.segments.length; j++) {
                for (var i = 0;i < this.segments.length;i++) {
                    if ( !this.segments[i].equals(this.segments[j]) && this.segments[i].getDistance(this.segments[j]) <= this.distanceThreshold) {
                        let mergedSegment = this.segments[i].merge(this.segments[j]);
                        this.segments[i] = mergedSegment;
                        this.segments[j] = mergedSegment;
                        merged = true;
                    }
                }
            }
            let newSegments = [];
            for (var i = this.segments.length - 1; i >= 0; i--) {
                const me = this;
                var existingSegment = newSegments.filter(function (s) { return s.equals(me.segments[i])});
                if (existingSegment.length == 0) {
                    newSegments.push(this.segments[i]);
                }
            }
            this.segments = newSegments;
        }
        return this.segments;
    }

    findPageSegmentOfElement(domElement) {
        let elementWrapper = new DOMElementWrapper(domElement);
        const targetPageSegment = this.findPageSegmentsByDistance().filter(function (pageSegment) {
            return pageSegment.findElement(elementWrapper);
        });
        console.log(targetPageSegment);
        targetPageSegment.sort(function (a, b) {
            return (elementWrapper.getNumberOfHops(a.domElement) - elementWrapper.getNumberOfHops(b.domElement)) < 0;
        });
        return targetPageSegment?targetPageSegment[0].domElement.domElement:null;
    }

    printSegments() {
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i].domElement.domElement.style.border = "1px solid black";
        }
    }
}

export {PageSegmentator, DOMElementWrapper};
export default PageSegmentator;
