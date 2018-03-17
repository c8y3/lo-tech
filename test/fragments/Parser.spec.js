import Parser from '/fragments/Parser';

describe('fragments.Parser', function() {
    describe('parse', function() {
        it('should not fail', function() {
            const subject = Parser();
            const result = subject.parse('<div/>');
            assert.equal(result.tagName, 'div');
        });
    });
});
