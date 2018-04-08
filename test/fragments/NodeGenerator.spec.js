import NodeGenerator from '/fragments/NodeGenerator';

// TODO should split the CodeGenerator class => the tests are becoming too cumbersome
describe('fragments.NodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = NodeGenerator();
    });


    describe('generateElement', function() {
        it('should use the tag name as constructor', function() {
            var result = subject.generateElement('lotech.Div', []);
            assert.equal(result, 'lotech.Div([])');
        });

        it('should build the custom element', function() {
            var result = subject.generateElement('Row', []);
            assert.equal(result, 'Row([])');
        });
    });
});
