import TextInput from '/lotech/TextInput';

describe('lotech.TextInput', function() {
    let subject;
    let node;

    beforeEach(function() {
        const parentNode = document.createElement('div');
        subject = TextInput();
        subject.draw(parentNode);
        node = parentNode.firstChild;
    });

    describe('draw', function() {
        it('should draw an element with tagname input', function() {
            assert.equal('INPUT', node.tagName);
        });

        it('should draw an element with type text', function() {
            assert.equal('text', node.type);
        });
    });
});
