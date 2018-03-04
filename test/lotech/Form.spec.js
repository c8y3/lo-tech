import Form from '/lotech/Form';
import P from '/lotech/P';

describe('lotech.Form', function() {
    let node;

    function draw(children) {
        const parentNode = document.createElement('div');
        const subject = Form(children);
        subject.draw(parentNode);
        node = parentNode.firstChild;
    }

    describe('with no children', function() {
        beforeEach(function() {
            draw([]);
        });

        describe('draw', function() {
            it('should draw an element with tagname form', function() {
                assert.equal('FORM', node.tagName);
            });
        });
    });

    describe('with 1 child', function() {
        beforeEach(function() {
            draw([P([])]);
        });

        describe('draw', function() {
            it('should draw form child', function() {
                assert.isNotNull(node.firstChild);
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
