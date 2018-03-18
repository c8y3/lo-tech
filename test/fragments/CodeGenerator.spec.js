import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = CodeGenerator();
    });

    describe('generate', function() {
        it('should not fail', function() {
            const result = subject.generate({tagName: 'div'});
            assert.equal(result.type, 'FunctionDeclaration');
        });

        it('should return a constructor of the node', function() {
            const result = subject.generate({tagName: 'p'});
            const returnStatement = result.body.body[0];
            const elementConstructor = returnStatement.argument.callee.property.name;
            assert.equal('P', elementConstructor);
        });

        it('should return correct constructor for div', function() {
            const result = subject.generate({tagName: 'div'});
            const returnStatement = result.body.body[0];
            const elementConstructor = returnStatement.argument.callee.property.name;
            assert.equal('Div', elementConstructor);
        });
//{"tagName":"div","attributes":{"class":"root"},"children":[{"type":"variable","name":"children"}]}

    });
});
