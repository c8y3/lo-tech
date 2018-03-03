import Form from '/lotech/Form';
import TextInput from '/lotech/TextInput';

describe('lotech.Form', function() {
    let node;

    beforeEach(function() {
        const parentNode = document.createElement('div');
        const subject = Form(TextInput());
        subject.draw(parentNode);
        node = parentNode.firstChild;
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
