import Parser from '/fragments/Compiler';

describe('fragments.Compiler', function() {
    describe('compile', function() {
        it('should not fail', function() {
            const subject = Parser();
            const result = subject.compile('<div/>');
            const expectedResult = 'import lotech from \'/lotech\';\n'
                                 + 'export default function() {\n'
                                 + '    return lotech.Div([]);\n'
                                 + '};';
            assert.equal(result, expectedResult);
        });
    });
});