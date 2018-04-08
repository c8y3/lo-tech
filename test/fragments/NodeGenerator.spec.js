import NodeGenerator from '/fragments/NodeGenerator';

// TODO should split the CodeGenerator class => the tests are becoming too cumbersome
describe('fragments.NodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = NodeGenerator();
    });


    describe('generateDeclarations', function() {
        it('should build the lotech element', function() {
            var result = subject.generateDeclarations([{nodeName: 'x', node: {type: 'element', tagName: 'div', children: []}}]);
            assert.equal(result[0], 'const x = lotech.Div([]);');
        });

        it('should build the custom element', function() {
            var result = subject.generateDeclarations([{nodeName: 'x', node: {type: 'element', tagName: 'Row', children: []}}]);
            assert.equal(result[0], 'const x = Row([]);');
        });
    });
});
