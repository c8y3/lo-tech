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

        it('should parse attributes', function() {
            const result = subject.parse('<div class="root"/>');
            assert.equal(result.attributes['class'], 'root');
        });

        it('should parse template variables', function() {
            const result = subject.parse('<div>{children}</div>');
            assert.equal(result.children[0].type, 'variable');
        });
    });
});
