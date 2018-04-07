import Parser from '/fragments/Parser';

describe('fragments.Parser', function() {
    let subject;

    beforeEach(function() {
        subject = Parser();
    });

    describe('parse', function() {
        it('should not fail', function() {
            const result = subject.parse('<div/>');
            assert.equal(result.tagName, 'div');
        });

        it('should return nodes with type element', function() {
            const result = subject.parse('<div/>');
            assert.equal(result.type, 'element');
        });

        it('should return tagName', function() {
            const result = subject.parse('<p/>');
            assert.equal(result.tagName, 'p');
        });

        it('should return an empty attributes object when there are no attributes', function() {
            const result = subject.parse('<div/>');
            assert.deepEqual(result.attributes, {});
        });

        it('should parse attributes', function() {
            const result = subject.parse('<div class="root"/>');
            assert.equal(result.attributes['class'].content, 'root');
        });

        it('should parse attributes key and value', function() {
            const result = subject.parse('<div placeholder="Search..."/>');
            assert.equal(result.attributes['placeholder'].content, 'Search...');
        });

        it('should parse children', function() {
            const result = subject.parse('<div><p/></div>');
            const child = result.children[0];
            assert.equal(child.tagName, 'p');
        });

        it('should parse template variables', function() {
            const result = subject.parse('<div>{children}</div>');
            assert.equal(result.children[0].type, 'variable');
        });

        it('should provide template variable name', function() {
            const result = subject.parse('<div>{children}</div>');
            assert.equal(result.children[0].name, 'children');
        });

        it('should preserve tag names upper case', function() {
            const result = subject.parse('<Row/>');
            assert.equal(result.tagName, 'Row');
        });

        it('should generate text nodes for text contents', function() {
            const result = subject.parse('<div>some text</div>');
            assert.equal(result.children[0].type, 'text');
        });

        it('should set content property in node generated from text contents', function() {
            const result = subject.parse('<div>some text</div>');
            assert.equal(result.children[0].content, 'some text');
        });

        it('should convert new lines into spaces in text contents', function() {
            const result = subject.parse('<div>Hello\nWorld</div>');
            assert.equal(result.children[0].content, 'Hello World');
        });

        it('should convert all new lines into spaces in text contents', function() {
            const result = subject.parse('<div>Hello\nWorld\nBye</div>');
            assert.equal(result.children[0].content, 'Hello World Bye');
        });

        it('should remove spaces around the text content', function() {
            const result = subject.parse('<div> Hello</div>');
            assert.equal(result.children[0].content, 'Hello');
        });

        it('should not create any nodes for text content which contains only spaces', function() {
            const result = subject.parse('<div> </div>');
            assert.equal(result.children.length, 0);
        });

        it('should generate a variable node when there are braces in text content', function() {
            const result = subject.parse('<div>{x}</div>');
            assert.equal(result.children[0].type, 'variable');
        });

        it('should generate a variable node with correct name', function() {
            const result = subject.parse('<div>{x}</div>');
            assert.equal(result.children[0].name, 'x');
        });

        it('should preserve attributes upper case', function() {
            const result = subject.parse('<div placeholder="Search..."/>');
            assert.equal(result.attributes['placeholder'].content, 'Search...');
        });

        it('should parse className as an array of nodes with type', function() {
            const result = subject.parse('<div className="name"/>');
            assert.equal(result.attributes.className[0].type, 'text');
        });

        it('should parse simple classes as text nodes with correct content', function() {
            const result = subject.parse('<div className="name"/>');
            assert.equal(result.attributes.className[0].content, 'name');
        });

        it('should parse className as an array with all elements', function() {
            const result = subject.parse('<div className="root selected"/>');
            assert.equal(result.attributes.className[1].content, 'selected');
        });

        it('should parse className as an array with a variable when there is a template', function() {
            const result = subject.parse('<div className="{isMissing}"/>');
            assert.equal(result.attributes.className[0].type, 'variable');
        });

        it('should parse attributes with a variable when there is a template', function() {
            const result = subject.parse('<Checkbox onChanged="{stockFilterChanged}"/>');
            assert.equal(result.attributes['onChanged'].type, 'variable');
        });

        it('should recognize self closing tags', function() {
            const result = subject.parse('<div><div/><p/></div>');
            assert.equal(2, result.children.length);
        });
    });
});
