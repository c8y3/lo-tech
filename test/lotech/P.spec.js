import P from '/lotech/P';

describe('lotech.P', function() {
    let node;

    function draw(children) {
        const parentNode = document.createElement('div');
        const subject = P(children);
        subject.draw(parentNode);
        node = parentNode.firstChild;
    }

    describe('with no children', function() {
        beforeEach(function() {
            draw([]);
        });

        describe('draw', function() {
            it('should draw an element with tagname p', function() {
                assert.equal('P', node.tagName);
            });
        });
    });

    describe('with 2 children', function() {
        beforeEach(function() {
            draw([P([]), P([])]);
        });

        describe('draw', function() {
            it('should draw all children', function() {
                assert.equal(2, node.childElementCount);
            });
        });
    });
});
