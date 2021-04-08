export function generateComponent(imports, tips, content, functions) {
    return (
        "import React, {Component} from 'react';\n" + imports + "\nclass Element extends Component {\n\ncomponentDidMount() {\n" + tips + "}\n\n" + functions + "render() {\nreturn (\n" + content + "\n);\n}\n}\nexport default Element;"
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