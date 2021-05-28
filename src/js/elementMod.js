import { addStr, generateRandomNumber } from "../js/helpers";

export function singleElementModify(refactoring, outputElement) {
    let defValue = "";
    outputElement = "";
    let stateManager = [];
    if (refactoring.stringElement.includes("defaultValue=")) {
        let aux5;
        let aux4 = refactoring.stringElement.split("defaultValue=\"");
        if (aux4.length == 1) { //para manejar defaultvalue numerico
            aux4 = refactoring.stringElement.split("defaultValue=");
            aux5 = aux4[1].split(" ");
            aux5[0] = aux5[0].toString();
        }
        else {
            aux5 = aux4[1].split("\"");
        }
        defValue = aux5[0];
    }
    let obj = {
        randomInt: refactoring.state,
        defValue
    }
    let outCut = refactoring.stringElement.replaceAll("/>", "@@@/>");
    outCut = outCut.split("@@@");
    outCut[0] = addStr(outCut[0], outCut[0].length - 1, " onChange={(e) => set" + refactoring.state + "(e.target.value)} value={" + refactoring.state + "}");
    outCut.forEach((o) => {
        outputElement += o;
    })
    stateManager.push(obj);
    return {
        stateManager,
        outputElement
    }
}

export function formElementModify(refactoring, outputCut, formName) {
    var stateManager = [];
    var outputForm = ""
    outputCut.forEach((val) => {
        if (val.includes(" name=") && val.includes("<form")) {
            let formNameAux = val.split(" name=\"");
            formNameAux = formNameAux[1].split("\"");
            formName = formNameAux[0];
        }
        if (val.includes("<form") && refactoring.required) {
            let sum = "";
            val = val.replaceAll(">", "@@@>");
            let cut = val.split("@@@");
            cut[0] += " onSubmit={(e) => { onSubmit(e);}}";
            cut.forEach((c) => {
                sum += c;
            })
            val = sum;
        }
        if (!val.includes("type=\"submit\"") && !val.includes("type=\"reset\"") && !val.includes("<form")) {
            val = val.replaceAll("/>", "@@@/>");
            let aux2 = val.split("@@@");
            aux2.forEach((val2, i2) => {
                if (i2 == 0) {
                    let randomInt;
                    let defValue = "";
                    if (val2.includes("defaultValue=")) {
                        let aux4 = val2.split("defaultValue=\"");
                        let aux5 = aux4[1].split("\"");
                        defValue = aux5[0];
                    }
                    if (val2.includes(" id=\"")) {
                        let aux3 = val2.split(" id=\"");
                        aux3 = aux3[1].split("\"");
                        randomInt = aux3[0];
                        if (refactoring.requiredInputs.includes(randomInt)) {
                            if (val2.includes(" style={{")) {
                                let ind = val2.indexOf(" style={{");
                                val2 = addStr(val2, ind + 9, "border: " + randomInt + " === \"\" ? \"red solid 1px\" : \"black solid 1px\",");
                            }
                            else {
                                val2 = addStr(val2, val2.length - 1, " style={{ border: " + randomInt + " === \"\" ? \"red solid 1px\" : \"black solid 1px\" }}");
                            }
                        }
                        val2 = addStr(val2, val2.length - 1, " value={" + randomInt + "}");
                    }
                    else {
                        randomInt = this.props.elementWord + generateRandomNumber().toString();
                        val2 = addStr(val2, val2.length - 1, " id=\"" + randomInt + "\" value={" + randomInt + "}");
                    }
                    val2 = addStr(val2, val2.length - 1, " onChange={(e) => set" + randomInt + "(e.target.value)}");
                    let obj = {
                        randomInt,
                        defValue
                    }
                    stateManager.push(obj);
                }
                outputForm += val2
            })
        }
        else {
            outputForm += val
        }
    })
    return {
        stateManager,
        outputForm
    }
}