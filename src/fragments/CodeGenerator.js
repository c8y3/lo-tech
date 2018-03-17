const LOTECH_ELEMENTS = {
    DIV: 'Div',
    P: 'P'
};

function generateConstructor(tagName) {
    return {
        type: 'MemberExpression',
        object: {
            type: 'Identifier',
            name: 'lotech'
        },
        property: {
            type: 'Identifier',
            name: LOTECH_ELEMENTS[tagName.toUpperCase()]
        }
    };
}

export default function() {
    return {
        generate(htpl) {
            const body = [{
                type: 'ReturnStatement',
                argument: {
                    type: 'CallExpression',
                    callee: generateConstructor(htpl.tagName),
                    arguments: [{
                        type: 'ArrayExpression',
                        elements: []
                    }]
                }
            }];
            const program = {
                type: 'Program',
                body: [{
                    type: 'ExportDefaultDeclaration',
                    declaration: {
                        type: 'FunctionDeclaration',
                        body: {
                            type: 'BlockStatement',
                            body: body
                        }
                    }
                }]
            };
            return program;
        }
    };
}

