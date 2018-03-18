import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = CodeGenerator();
    });

    describe('generate', function() {
        it('should not fail', function() {
            const result = subject.generate({tagName: 'div'});
            assert.equal('lotech.Div([])', result);
        });

        it('should return a constructor of the node', function() {
            const result = subject.generate({tagName: 'p'});
            assert.equal('lotech.P([])', result);
        });

//{"tagName":"div","attributes":{"class":"root"},"children":[{"type":"variable","name":"children"}]}

    });
});
