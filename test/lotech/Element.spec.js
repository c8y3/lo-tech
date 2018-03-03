import Element from '/lotech/Element';

describe('lotech.Element', function() {
    describe('draw', function() {
        it('should not fail', function() {
            const node = document.createElement('div');
            const subject = Element(node);
            const parentNode = document.createElement('span');
            subject.draw(parentNode);
        });

        it('should append the element node to the parent node', function() {
            const node = document.createElement('div');
            const subject = Element(node);
            const parentNode = document.createElement('span');
            subject.draw(parentNode);
            assert.equal(node, parentNode.firstChild);
        });
    });
});
