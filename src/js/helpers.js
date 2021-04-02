export function generateComponent(imports, tips, content) {
    return (
        "import React, {Component} from 'react';\n" + imports + "\nclass Element extends Component {\n\ncomponentDidMount() {\n" + tips + "}\n\nrender() {\nreturn (\n" + content + "\n);\n}\n}\nexport default Element;"
    )
}

export function generateNotElementComponent(imports, mount, functions, content) {
    return (
        "import React, {Component} from 'react';\n" + imports + "\nclass Element extends Component {\n\ncomponentDidMount() {\n" + mount + "}\n\n" + functions + "render() {\nreturn (\n" + content + "\n);\n}\n}\nexport default Element;"
    )
}