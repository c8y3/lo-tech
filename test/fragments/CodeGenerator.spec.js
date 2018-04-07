import CodeGenerator from '/fragments/CodeGenerator';
import Element from '/fragments/nodes/Element';

// TODO should split the CodeGenerator class => the tests are becoming too cumbersome
describe('fragments.CodeGenerator', function() {
    let subject;

    beforeEach(function() {
        subject = CodeGenerator('Scope');
    });

    describe('generate', function() {
        it('should create a variable for each node', function() {
            const element = Element('div');
            const result = subject.generate(element);
            assert.equal(result[0], 'const node1 = lotech.Div([]);');
        });

        it('should use the node variable', function() {
            const element = Element('div');
            const result = subject.generate(element);
            assert.equal(result[1], 'const component = lotech.Component(node1);');
        });

        it('should return a constructor of the node', function() {
            const element = Element('p');
            const result = subject.generate(element);
            assert.equal(result[0], 'const node1 = lotech.P([]);');
        });

        it('should append children', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'children'}];
            const result = subject.generate(element);
            assert.equal(result[0], 'const node1 = lotech.Div([...children]);');
        });

        it('should pass the constructor when the tag name is upper case', function() {
            const element = Element('Row');
            const result = subject.generate(element);
            assert.equal(result[0], 'const node1 = Row([]);');
        });

        it('should set style when the className attributes is present', function() {
            const element = Element('div');
            element.style = [{type: 'text', content: 'root'}];
            const result = subject.generate(element);
            assert.equal(result[1], 'node1.addStyle(\'Scope\', \'root\');');
        });

        it('should set the scope part of the style correctly', function() {
            subject = CodeGenerator('AnotherScope');
            const element = Element('div');
            element.style = [{type: 'text', content: 'root'}];
            const result = subject.generate(element);
            assert.equal(result[1], 'node1.addStyle(\'AnotherScope\', \'root\');');
        });

        it('should set class name correctly', function() {
            const element = Element('div');
            element.style = [{type: 'text', content: 'selected'}];
            const result = subject.generate(element);
            assert.equal(result[1], 'node1.addStyle(\'Scope\', \'selected\');');
        });

        it('should set the several styles alternatively when there are several classes', function() {
            const element = Element('div');
            element.style = [{type: 'text', content: 'root'}, {type: 'text', content: 'selected'}];
            const result = subject.generate(element);
            assert.equal(result[2], 'node1.addStyle(\'Scope\', \'selected\');');
        });

        it('should return the text as a lotech.String node', function() {
            const element = Element('div');
            element.children = [{type: 'text', content: 'Hello'}];
            const result = subject.generate(element);
            assert.equal(result[0], 'const node1 = lotech.Div([lotech.String(\'Hello\')]);');
        });

        it('should create a variable for the component', function() {
            const element = Element('div');
            const result = subject.generate(element);
            assert.equal(result[1], 'const component = lotech.Component(node1);');
        });

        it('should return the component', function() {
            const element = Element('div');
            const result = subject.generate(element);
            assert.equal(result[2], 'return component;');
        });

        it('should create a String node for variables which are not children', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[0], 'const node1 = lotech.String(\'\');');
        });

        it('should define a setter for variables which are not children', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[2], 'function setPrice(price) { node1.setData(price); }');
        });

        it('should define a setter with corresponding name for variables which are not children', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'name'}];
            const result = subject.generate(element);
            assert.equal(result[2], 'function setName(name) { node1.setData(name); }');
        });

        it('should use the variable name for variables which are not children', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[1], 'const node2 = lotech.Div([node1]);');
        });

        it('should use the correct variable name to set the class name', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'price'}];
            element.style = [{type: 'text', content: 'root'}];
            const result = subject.generate(element);
            assert.equal(result[2], 'node2.addStyle(\'Scope\', \'root\');');
        });

        it('should return a setter for variables which are not children', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[4], 'return {...component, setPrice};');
        });

// TODO when children in unused, do not make it appear in the signature of the component
        it('should use a different variable name when there are several variables', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[1], 'const node2 = lotech.String(\'\');');
        });

        it('should separate setters with commas when there are several variables', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[6], 'return {...component, setName, setPrice};');
        });

        it('should set value to the correct node when there are several variables', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate(element);
// TODO would be more efficient to do this as const setPrice = node3.setData;
            assert.equal(result[4], 'function setPrice(price) { node2.setData(price); }');
        });

        it('should insert the correct node when there are several variables', function() {
            const element = Element('div');
            element.children = [{type: 'variable', name: 'name'}, {type: 'variable', name: 'price'}];
            const result = subject.generate(element);
            assert.equal(result[2], 'const node3 = lotech.Div([node1, node2]);');
        });

        it('should define a method to set the className, when there is a template in attribute', function() {
            const element = Element('div');
            element.style = [{type: 'variable', name: 'isMissing'}];
            const result = subject.generate(element);
            assert.equal(result[1], 'function setIsMissing(isMissing) { if (isMissing) { node1.addStyle(\'Scope\', \'isMissing\'); } else { node1.removeStyle(\'Scope\', \'isMissing\'); } }');
        });

        it('should export a method to set the className, when there is a template in attribute', function() {
            const element = Element('div');
            element.style = [{type: 'variable', name: 'isMissing'}];
            const result = subject.generate(element);
            assert.equal(result[3], 'return {...component, setIsMissing};');
        });

        it('should provide a method to set the children', function() {
            const child = {type: 'variable', name: 'children'};
            const element = Element('div');
            element.children = [child];
            const result = subject.generate(element);
            assert.equal(result[1], 'function setChildren(children) { node1.replaceChildren(0, children); }');
        });

        it('should replace the children of the correct node', function() {
            const child = {type: 'variable', name: 'children'};
            const div = Element('div');
            div.children = [child];
            const element = Element('div');
            element.children = [div];
            const result = subject.generate(element);
            assert.equal(result[2], 'function setChildren(children) { node1.replaceChildren(0, children); }');
        });

        it('should replace the children from the correct index', function() {
            const child = {type: 'variable', name: 'children'};
            const div = Element('div');
            const element = Element('div');
            element.children = [div, child];
            const result = subject.generate(element);
            assert.equal(result[2], 'function setChildren(children) { node2.replaceChildren(1, children); }');
        });

        it('should define a method to add a listener with attributes starting by on', function() {
            const element = Element('Checkbox');
            element.attributes = { onChanged: {type: 'variable', name: 'stockFilterChanged'} };
            const result = subject.generate(element);
// TODO would be more efficient this way
//            assert.equal(result[1], 'const addListenerOnStockFilterChanged = node1.addListenerOnChanged;');
            assert.equal(result[1], 'function addListenerOnStockFilterChanged(listener) { node1.addListenerOnChanged(listener); }');
        });

        it('should define a method to add a listener which calls the correct event listener', function() {
            const element = Element('Text');
            element.attributes = { onInput: {type: 'variable', name: 'nameFilterChanged'} };
            const result = subject.generate(element);
// TODO would be more efficient this way
//            assert.equal(result[1], 'const addListenerOnStockFilterChanged = node1.addListenerOnChanged;');
            assert.equal(result[1], 'function addListenerOnNameFilterChanged(listener) { node1.addListenerOnInput(listener); }');
        });

        it('should set the value of regular attributes', function() {
            const element = Element('Text');
            element.attributes = { placeholder: { type: 'text', content: 'Search...' } };
            const result = subject.generate(element);
            assert.equal(result[1], 'node1.setPlaceholder(\'Search...\');');
        });

        it('should define a setter for attributes with a variable as value', function() {
            const element = Element('ProductTable');
            element.attributes = { names: {type: 'variable', name: 'products'} };
            const result = subject.generate(element);
            assert.equal(result[1], 'function setProducts(products) { node1.setNames(products); }');
        });
    });
});
