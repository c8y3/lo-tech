import CodeGenerator from '/fragments/CodeGenerator';

// TODO should split the CodeGenerator class => the tests are becoming too cumbersome
describe('fragments.CodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = CodeGenerator('Scope');
    });

    describe('generate', function() {
        it('should create a variable for each node', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: []});
            assert.equal(result[0], 'const node1 = lotech.Div([]);');
        });

        it('should use the node variable', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: []});
            assert.equal(result[1], 'const component = lotech.Component(node1);');
        });

        it('should return a constructor of the node', function() {
            const result = subject.generate({type: 'element', tagName: 'p', attributes: {}, children: []});
            assert.equal(result[0], 'const node1 = lotech.P([]);');
        });

        it('should append children', function() {
            const child = {type: 'variable', name: 'children'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[0], 'const node1 = lotech.Div([...children]);');
        });

        it('should pass the constructor when the tag name is upper case', function() {
            const result = subject.generate({type: 'element', tagName: 'Row', attributes: {}, children: []});
            assert.equal(result[0], 'const node1 = Row([]);');
        });

        it('should set style when the className attributes is present', function() {
            const className = [{type: 'text', content: 'root'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: []});
// TODO use addStyle rather than addClass
            assert.equal(result[1], 'node1.addClass(\'Scope__root\');');
        });

        it('should set the scope part of the style correctly', function() {
            subject = CodeGenerator('AnotherScope');
            const className = [{type: 'text', content: 'root'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: []});
// TODO use addStyle rather than addClass
            assert.equal(result[1], 'node1.addClass(\'AnotherScope__root\');');
        });

        it('should set class name correctly', function() {
            const className = [{type: 'text', content: 'selected'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: []});
// TODO use addStyle rather than addClass
            assert.equal(result[1], 'node1.addClass(\'Scope__selected\');');
        });

        it('should set style the several styles alternatively when there are several classes', function() {
            const className = [{type: 'text', content: 'root'}, {type: 'text', content: 'selected'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: []});
            assert.equal(result[2], 'node1.addClass(\'Scope__selected\');');
        });

        it('should return the text as a lotech.String node', function() {
            const child = {type: 'text', content: 'Hello'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[0], 'const node1 = lotech.Div([lotech.String(\'Hello\')]);');
        });

        it('should create a variable for the component', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: []});
            assert.equal(result[1], 'const component = lotech.Component(node1);');
        });

        it('should return the component', function() {
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: []});
            assert.equal(result[2], 'return component;');
        });

        it('should create a String node for variables which are not children', function() {
            const child = {type: 'variable', name: 'price'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[0], 'const node1 = lotech.String(\'\');');
        });

        it('should define a setter for variables which are not children', function() {
            const child = {type: 'variable', name: 'price'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[2], 'function setPrice(price) { node1.setData(price); }');
        });

        it('should define a setter with corresponding name for variables which are not children', function() {
            const child = {type: 'variable', name: 'name'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[2], 'function setName(name) { node1.setData(name); }');
        });

        it('should use the variable name for variables which are not children', function() {
            const child = {type: 'variable', name: 'price'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[1], 'const node2 = lotech.Div([node1]);');
        });

        it('should use the correct variable name to set the class name', function() {
            const child = {type: 'variable', name: 'price'};
            const className = [{type: 'text', content: 'root'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: [child]});
            assert.equal(result[2], 'node2.addClass(\'Scope__root\');');
        });

        it('should return a setter for variables which are not children', function() {
            const child = {type: 'variable', name: 'price'};
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: [child]});
            assert.equal(result[4], 'return {...component, setPrice};');
        });

// TODO when children in unused, do not make it appear in the signature of the component
        it('should use a different variable name when there are several variables', function() {
            const children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: children});
            assert.equal(result[1], 'const node2 = lotech.String(\'\');');
        });

        it('should separate setters with commas when there are several variables', function() {
            const children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: children});
            assert.equal(result[6], 'return {...component, setName, setPrice};');
        });

        it('should set value to the correct node when there are several variables', function() {
            const children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: children});
            assert.equal(result[4], 'function setPrice(price) { node2.setData(price); }');
        });

        it('should insert the correct node when there are several variables', function() {
            const children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {}, children: children});
            assert.equal(result[2], 'const node3 = lotech.Div([node1, node2]);');
        });

        it('should define a method to set the className, when there is a template in attribute', function() {
            const className = [{type: 'variable', name: 'isMissing'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: []});
            assert.equal(result[1], 'function setIsMissing(isMissing) { if (isMissing) { node1.addClass(\'Scope__isMissing\'); } else { node1.removeClass(\'Scope__isMissing\'); } }');
        });

        it('should export a method to set the className, when there is a template in attribute', function() {
            const className = [{type: 'variable', name: 'isMissing'}];
            const result = subject.generate({type: 'element', tagName: 'div', attributes: {className: className}, children: []});
            assert.equal(result[3], 'return {...component, setIsMissing};');
        });
    });
});
