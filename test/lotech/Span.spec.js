import Span from '/lotech/Span';

describe('lotech.Span', function() {
    let node;

    beforeEach(function() {
        const parentNode = document.createElement('div');
        const subject = Span('hello');
        subject.draw(parentNode);
        node = parentNode.firstChild;
    });

    describe('draw', function() {
        it('should draw an element with tag name span', function() {
            assert.equal('SPAN', node.tagName);
        });

        it('should draw a set the textContent', function() {
            assert.equal('hello', node.textContent);
        });
    });
});
