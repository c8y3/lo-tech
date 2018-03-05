import Span from '/lotech/Span';

describe('lotech.Span', function() {
    let subject;

    beforeEach(function() {
        subject = Span('hello');
    });

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    describe('draw', function() {
        it('should draw an element with tag name span', function() {
            const node = draw();
            assert.equal('SPAN', node.tagName);
        });

        it('should draw a set the textContent', function() {
            const node = draw();
            assert.equal('hello', node.textContent);
        });
    });

    describe('addStyle', function() {
        it('should add class name to the node', function() {
            subject.addStyle('scope', 'name');
            const node = draw();
            assert.equal('scope__name', node.className);
        });
    });
});
