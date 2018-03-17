import RollupPlugin from '/fragments/RollupPlugin';

describe('fragments.RollupPlugin', function() {
    describe('transform', function() {
        it('should not fail', function() {
            const subject = RollupPlugin();
            subject.transform();
        });
    });
});
