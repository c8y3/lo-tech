import CodeGenerator from '/fragments/CodeGenerator';

describe('fragments.CodeGenerator', function() {
    describe('generate', function() {
        it('should not fail', function() {
            const subject = CodeGenerator();
            const result = subject.generate({});
            const expectedResult = 'export default function () {\n'
                                 + '  return lotech.Div([]);\n'
                                 + '}\n';
            assert.equal(result, expectedResult);
        });
    });
});
