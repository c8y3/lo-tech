import ElementFromTagName from '/lotech/ElementFromTagName';

describe('lotech.ElementFromTagName', function() {
    let subject;
    let parentNode;

    beforeEach(function() {
        subject = ElementFromTagName('div');
        parentNode = document.createElement('span');
    });

    describe('draw', function() {
        it('should not fail', function() {
            subject.draw(parentNode);
        });

        it('should append the element node to the parent node', function() {
            subject.draw(parentNode);
            const node = parentNode.firstChild;
            assert.equal('DIV', node.tagName);
        });
    });
});
