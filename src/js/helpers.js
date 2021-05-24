export function generateComponent(imports, functions, stringRefactoring, states) {
    let importsTxt = "";
    let functionsTxt = "";
    let statesTxt = "";
    imports.map(imp => {
        importsTxt += imp;
    })
    functions.map(func => {
        functionsTxt += func;
    })
    states.map(state => {
        if (typeof state.defValue == "boolean")
            statesTxt += "const [" + state.randomInt + ", set" + state.randomInt + "] = React.useState(" + state.defValue + ");\n"
        else
            statesTxt += "const [" + state.randomInt + ", set" + state.randomInt + "] = React.useState(\"" + state.defValue + "\");\n"
    })
    return (
        "import React from 'react';\n" + importsTxt + "\nfunction Form() {\n\n" + statesTxt + functionsTxt + "\nreturn (\n" + stringRefactoring + "\n);\n}\nexport default Form;"
    )
}

export function generateRequiredFormComponent(imports, functions, stringRefactoring, requiredInputs, states) {
    let importsTxt = "";
    let functionsTxt = "";
    let requiredInputsTxt = "";
    let statesTxt = "";
    imports.map(imp => {
        importsTxt += imp;
    })
    functions.map(func => {
        functionsTxt += func;
    })
    for (let i = 0; i < requiredInputs.length; i++) {
        requiredInputsTxt += requiredInputs[i] + " === \"\"";
        if (i != (requiredInputs.length - 1))
            requiredInputsTxt += " || ";
    }
    states.map(state => {
        statesTxt += "const [" + state.randomInt + ", set" + state.randomInt + "] = React.useState(\"" + state.defValue + "\");\n"
    })
    return (
        "import React from 'react';\n" + importsTxt + "\nfunction Form() {\n\n" + statesTxt + functionsTxt + "const onSubmit = (event) => {\nlet invalidInputs = false;\nif (" + requiredInputsTxt + ")\ninvalidInputs = true;\nif (invalidInputs)\nevent.preventDefault();\n}\nreturn (\n" + stringRefactoring + "\n);\n}\nexport default Form;"
    )
}

export function generateArray(old, newests) {
    newests.map(newest => {
        if (!old.includes(newest))
            old.push(newest);
    })
    return old
}

export function generateRandomNumber() {
    return Math.floor(Math.random() * 9999) + 1;
}
