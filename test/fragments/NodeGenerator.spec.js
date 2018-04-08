import NodeGenerator from '/fragments/NodeGenerator';

// TODO should split the CodeGenerator class => the tests are becoming too cumbersome
describe('fragments.NodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = NodeGenerator();
    });

    describe('generateElement', function() {
        it('should generate text element as a lotech element', function() {
            var result = subject.generateElement('text', []);
            assert.equal(result, 'lotech.input.Text([])');
        });

        it('should have form in its predefined elements', function() {
            var result = subject.generateElement('form', []);
            assert.equal(result, 'lotech.Form([])');
        });

        it('should have span in its predefined elements', function() {
            var result = subject.generateElement('span', []);
            assert.equal(result, 'lotech.Span([])');
        });

        it('should generate checkbox element as a lotech element', function() {
            var result = subject.generateElement('checkbox', []);
            assert.equal(result, 'lotech.input.Checkbox([])');
        });
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
