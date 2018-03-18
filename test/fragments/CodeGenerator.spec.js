import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = CodeGenerator();
    });

    describe('generate', function() {
        it('should not fail', function() {
            const result = subject.generate({type: 'element', tagName: 'div', children: []});
            assert.equal(result, 'lotech.createElement(\'div\', {}, [])');
        });

        it('should return a constructor of the node', function() {
            const result = subject.generate({type: 'element', tagName: 'p', children: []});
            assert.equal(result, 'lotech.createElement(\'p\', {}, [])');
        });

        it('should append children', function() {
            const result = subject.generate({type: 'element', tagName: 'div', children: [{type: 'variable'}]});
            assert.equal(result, 'lotech.createElement(\'div\', {}, children)');
        });
//{"tagName":"div","attributes":{"class":"root"},"children":[{"type":"variable","name":"children"}]}

    });
});
