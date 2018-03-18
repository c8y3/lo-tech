import Compiler from '/fragments/Compiler';

describe('fragments.Compiler', function() {
    describe('compile', function() {
        it('should not fail', function() {
            const subject = Compiler();
            const result = subject.compile('<div/>');
            const expectedResult = 'import lotech from \'/lotech\';\n'
                                 + 'export default function(children) {\n'
                                 + '  return lotech.Component(lotech.createElement(\'div\', {}, []));\n'
                                 + '}';
            assert.equal(result, expectedResult);
        });
    });
});
