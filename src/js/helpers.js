export function generateComponent(imports, mounts, functions, stringRefactoring) {
    let importsTxt = "";
    let mountsTxt = "";
    let functionsTxt = "";
    imports.map( imp => {
        importsTxt += imp;
    })
    mounts.map( mount => {
        mountsTxt += mount;
    })
    functions.map( func => {
        functionsTxt += func;
    })
    return (
        "import React, {Component} from 'react';\n" + importsTxt + "\nclass Element extends Component {\n\ncomponentDidMount() {\n" + mountsTxt + "}\n\n" + functionsTxt + "render() {\nreturn (\n" + stringRefactoring + "\n);\n}\n}\nexport default Element;"
    )
}

export function generateStyle(text, randomInt, style) {
    return (
        "#" + text + randomInt.toString() + "{" + style + "}\n"
    )
}

export function generateArray(old, newests) {
    newests.map( newest => {
        if (!old.includes(newest))
            old.push(newest);
    })
    return old
}