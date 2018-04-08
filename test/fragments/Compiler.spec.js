import Compiler from '/fragments/Compiler';

describe('fragments.Compiler', function() {
    let subject;

    beforeEach(function() {
        subject = Compiler();
    });

    describe('compile', function() {
        it('should not fail', function() {
            const result = subject.compile('<lotech.Div/>');
            const expectedResult = 'import lotech from \'/lotech\';\n'
                                 + 'export default function(children) {\n'
                                 + '    const node1 = lotech.Div([]);\n'
                                 + '    const component = lotech.Component(node1);\n'
                                 + '    return component;\n'
                                 + '}';
            assert.equal(result, expectedResult);
        });

        it('should keep import section', function() {
            const input = 'import Row from \'Row\';\n'
                        + '<Row/>';
            const result = subject.compile(input);
            const expectedResult = 'import lotech from \'/lotech\';\n'
                                 + 'import Row from \'Row\';\n'
                                 + 'export default function(children) {\n'
                                 + '    const node1 = Row([]);\n'
                                 + '    const component = lotech.Component(node1);\n'
                                 + '    return component;\n'
                                 + '}';
            assert.equal(result, expectedResult);
        });
    });
});
