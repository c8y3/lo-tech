import Text from '/lotech/input/Text';

describe('lotech.input.Text', function() {
    let subject;

    beforeEach(function() {
        subject = Text('Search...');
    });

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    describe('draw', function() {
        it('should draw an element with tagname input', function() {
            const node = draw();
            assert.equal('INPUT', node.tagName);
        });

        it('should draw an element with type text', function() {
            const node = draw();
            assert.equal('text', node.type);
        });

        it('should set the placeholder of the input', function() {
            const node = draw();
            assert.equal('Search...', node.placeholder);
        });
    });
});
