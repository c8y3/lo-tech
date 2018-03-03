import String from '/lotech/String';

describe('lotech.String', function() {
    let node;

    beforeEach(function() {
        const parentNode = document.createElement('div');
        const subject = String('hello');
        subject.draw(parentNode);
        node = parentNode.firstChild;
    });

    describe('draw', function() {
        it('should draw a text node', function() {
            assert.equal(Node.TEXT_NODE, node.nodeType);
        });

        it('should draw a text node', function() {
            assert.equal('hello', node.data);
        });
    });
});
