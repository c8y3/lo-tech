import Form from '/lotech/Form';

describe('lotech.Form', function() {
    describe('draw', function() {
        it('should draw an element with tagname form', function() {
            const node = document.createElement('div');
            const subject = Form();
            subject.draw(node);
            assert.equal('FORM', node.firstChild.tagName);
        });
    });
});
