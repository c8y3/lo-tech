import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    describe('generate', function() {
        it('should not fail', function() {
            const subject = CodeGenerator();
            const result = subject.generate({});
            const expectedResult = 'function() {\n'
                                 + '    return lotech.Div([]);\n'
                                 + '}';
            assert.equal(result, expectedResult);
        });
    });
});
