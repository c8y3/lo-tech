import Element from '/lotech/Element';

describe('lotech.Element', function() {
    describe('draw', function() {
        it('should not fail', function() {
            const node = {};
            const subject = Element(node);
            const parentNode = {
                appendChild: function() {}
            };
            subject.draw(parentNode);
        });
    });
});
