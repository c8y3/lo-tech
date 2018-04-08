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
            subject.transform('<div/>', '.htpl');
        });

        it('should compile the input code', function() {
            const result = subject.transform('<lotech.Div/>', '.htpl');
            const expectedResult = 'import lotech from \'/lotech\';\n'
                                 + 'export default function(children) {\n'
                                 + '    const node1 = lotech.Div([]);\n'
                                 + '    const component = lotech.Component(node1);\n'
                                 + '    return component;\n'
                                 + '}';
            assert.equal(result, expectedResult);
        });

        it('should compile only files with .htpl suffix', function() {
            const result = subject.transform('', '.js');
            assert.isUndefined(result);
        });

// TODO it should accept include and exclude options
    });
});
