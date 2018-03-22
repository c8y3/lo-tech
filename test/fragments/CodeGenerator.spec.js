import CodeGenerator from '/fragments/CodeGenerator';

// TODO should split the CodeGenerator class => the tests are becoming too cumbersome
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
            assert.equal(result, 'lotech.createElement(\'div\', {\'class\': "root"}, [])');
        });

        it('should pass the constructor when the tag name is upper case', function() {
            const result = subject.generate({type: 'element', tagName: 'Row', attributes: {}, children: []});
            assert.equal(result, 'lotech.createElement(Row, {}, [])');
        });

        it('should set style as an array', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {style: 'root'}, children: []});
            assert.equal(result, 'lotech.createElement(\'div\', {\'style\': ["root"]}, [])');
        });

        it('should set style as an array of several elements when there is a spec', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {style: 'root selected'}, children: []});
            assert.equal(result, 'lotech.createElement(\'div\', {\'style\': ["root","selected"]}, [])');
        });

        it('should separate attributes with semicolon', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {scope: 'Row', style: 'root'}, children: []});
            assert.equal(result, 'lotech.createElement(\'div\', {\'scope\': "Row", \'style\': ["root"]}, [])');            
        });

        it('should return the text as a lotech.String node', function() {
            const child = {type: 'text', content: 'Hello'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result, 'lotech.createElement(\'div\', {}, [lotech.String(\'Hello\')])');
        });

        it('should convert new lines into spaces in text contents', function() {
            const child = {type: 'text', content: 'Hello\nWorld'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result, 'lotech.createElement(\'div\', {}, [lotech.String(\'Hello World\')])');
        });

        it('should convert all new lines into spaces in text contents', function() {
            const child = {type: 'text', content: 'Hello\nWorld\nBye'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result, 'lotech.createElement(\'div\', {}, [lotech.String(\'Hello World Bye\')])');
        });
    });
});
