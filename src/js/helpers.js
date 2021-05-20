export function generateComponent(imports, functions, stringRefactoring) {
    let importsTxt = "";
    let functionsTxt = "";
    imports.map( imp => {
        importsTxt += imp;
    })
    functions.map( func => {
        functionsTxt += func;
    })
    return (
        "import React, {useState} from 'react';\n" + importsTxt + "\nfunction Element() {\n\n" + functionsTxt + "\nreturn (\n" + stringRefactoring + "\n);\n}\nexport default Element;"
    )
}

export function generateArray(old, newests) {
    newests.map( newest => {
        if (!old.includes(newest))
            old.push(newest);
    })
    return old
}
