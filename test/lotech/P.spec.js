import P from '/lotech/P';

describe('lotech.P', function() {
    let node;

    beforeEach(function() {
        const parentNode = document.createElement('div');
        const subject = P();
        subject.draw(parentNode);
        node = parentNode.firstChild;
    });

    describe('draw', function() {
        it('should draw an element with tagname p', function() {
            assert.equal('P', node.tagName);
        });
    });
});
