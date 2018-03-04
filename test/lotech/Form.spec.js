import Form from '/lotech/Form';
import TextInput from '/lotech/TextInput';

describe('lotech.Form', function() {
    let node;

    function draw(children) {
        const parentNode = document.createElement('div');
        const subject = Form(children);
        subject.draw(parentNode);
        node = parentNode.firstChild;
    }

    describe('with 1 child', function() {
        beforeEach(function() {
            draw([TextInput()]);
        });

        describe('draw', function() {

            it('should draw an element with tagname form', function() {
                assert.equal('FORM', node.tagName);
            });

            it('should draw form child', function() {
                assert.isNotNull(node.firstChild);
            });
        });
    });

    describe('with 2 children', function() {
        beforeEach(function() {
            draw([TextInput(), TextInput()]);
        });

        describe('draw', function() {
            it('should draw all children', function() {
                assert.equal(2, node.childElementCount);
            });
        });
    });
});
