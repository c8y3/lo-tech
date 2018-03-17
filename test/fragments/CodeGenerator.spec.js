import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    describe('generate', function() {
        it('should not fail', function() {
            const subject = CodeGenerator();
            const result = subject.generate({});
            assert.equal(result.type, 'Program');
        });
    });
});
