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
            assert.equal(result.attributes['class'], 'root');
        });

        it('should parse attributes key and value', function() {
            const result = subject.parse('<div placeholder="Search..."/>');
            assert.equal(result.attributes['placeholder'], 'Search...');
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
    });
});
