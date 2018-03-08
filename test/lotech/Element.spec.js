import Element from '/lotech/Element';

describe('lotech.Element', function() {
    let subject;
    let parentNode;
    let node;

    beforeEach(function() {
        node = document.createElement('span');
        subject = Element(node);
        parentNode = document.createElement('div');
    });

    describe('draw', function() {
        it('should not fail', function() {
            subject.draw(parentNode);
        });

        it('should append the element node to the parent node', function() {
            subject.draw(parentNode);
            assert.equal(node, parentNode.firstChild);
        });
    });
});
