import RollupPlugin from '/fragments/RollupPlugin';

describe('fragments.RollupPlugin', function() {
    let subject;

    beforeEach(function() {
        subject = RollupPlugin();
    });

    describe('name', function() {
        it('should return the plugin name', function() {
            assert.equal(subject.name, 'fragmentpl');
        });
    });

    describe('transform', function() {
        it('should not fail', function() {
            subject.transform();
        });

        it('should compile the input code', function() {
            const result = subject.transform('<div/>');
            const expectedResult = 'import lotech from \'/lotech\';\n'
                                 + 'export default function() {\n'
                                 + '    return lotech.Div([]);\n'
                                 + '};';
            assert.equal(result, expectedResult);
        });
    });
});
