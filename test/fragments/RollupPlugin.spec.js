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
    });
});
