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

    describe('setPlaceholder', function() {
        it('should set the placeholder of the input', function() {
            const text = 'Hello';
            subject.setPlaceholder(text);
            const node = draw();
            assert.equal(text, node.placeholder);
        });
    });

    describe('getValue', function() {
        it('should return the value of the input', function() {
            assert.equal('', subject.getValue());
        });
    });

    describe('setValue', function() {
        it('should set the value of the input', function() {
            const value = 'some value';
            subject.setValue(value);
            assert.equal(value, subject.getValue());
        });
    });

    describe('addListenerOnInput', function() {
        it('should text inputs', function() {
            let input;
            // TODO do this with sinon
            subject.addListenerOnInput(function(value) {
                input = value;
            });
            const node = draw();
            node.value = 'hello';
            node.dispatchEvent(new Event('input'));
            assert.equal('hello', input);
        });
    });
});
