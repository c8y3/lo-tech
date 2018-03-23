import String from '/lotech/String';

describe('lotech.String', function() {
    let subject;

    beforeEach(function() {
        subject = String('hello');
    });

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;        
    }

    describe('draw', function() {
        it('should draw a text node', function() {
            const node = draw();
            assert.equal(Node.TEXT_NODE, node.nodeType);
        });

        it('should draw a text node', function() {
            const node = draw();
            assert.equal('hello', node.data);
        });
    });

    describe('setData', function() {
        it('should set the node data', function() {
            subject.setData('bye');
            const node = draw();
            assert.equal('bye', node.data);
        });
    });
});
