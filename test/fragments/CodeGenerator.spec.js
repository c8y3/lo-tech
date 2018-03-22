import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = CodeGenerator();
    });

    describe('generate', function() {
        it('should not fail', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: []});
            assert.equal(result, 'lotech.createElement(\'div\', {}, [])');
        });

        it('should return a constructor of the node', function() {
            const result = subject.generate({type: 'element', tagName: 'p', attributes: {}, children: []});
            assert.equal(result, 'lotech.createElement(\'p\', {}, [])');
        });

        it('should append children', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [{type: 'variable'}]});
            assert.equal(result, 'lotech.createElement(\'div\', {}, [...children])');
        });

        it('should set attributes', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {class: 'root'}, children: []});
            assert.equal(result, 'lotech.createElement(\'div\', {"class":"root"}, [])');
        });

        it('should pass the constructor when the tag name is upper case', function() {
            const result = subject.generate({type: 'element', tagName: 'Row', attributes: {}, children: []});
            assert.equal(result, 'lotech.createElement(Row, {}, [])');
        });
    });
});
