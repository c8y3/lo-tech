import Element from '/lotech/Element';

describe('lotech.Element', function() {
    describe('draw', function() {
        it('should not fail', function() {
            const node = document.createElement('div');
            const subject = Element(node);
            const parentNode = document.createElement('span');
            subject.draw(parentNode);
        });
    });
});
