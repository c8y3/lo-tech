export default function() {
    return {
        generate() {
            const body = [{
                type: 'ReturnStatement',
                argument: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'lotech'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'Div'
                        }
                    },
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

