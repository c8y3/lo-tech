import TextInput from '/lotech/TextInput';

describe('lotech.TextInput', function() {
    describe('draw', function() {
        it('should draw an element with tagname input', function() {
            const node = document.createElement('div');
            const subject = TextInput();
            subject.draw(node);
            assert.equal('INPUT', node.firstChild.tagName);
        });
    });
});
