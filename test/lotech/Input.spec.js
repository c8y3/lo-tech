import Input from '/lotech/Input';

describe('lotech.Input', function() {
    let subject;

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    // TODO split into lotech.input.Text and lotech.input.Checkbox
    describe('with type text', function() {
        beforeEach(function() {
            subject = Input('text');
        });

        describe('draw', function() {
            it('should draw an element with tagname input', function() {
                const node = draw();
                assert.equal('INPUT', node.tagName);
            });

            it('should draw an element with type text', function() {
                const node = draw();
                assert.equal('text', node.type);
            });
        });

        describe('setPlaceholder', function() {
            it('should set the placeholder of the input', function() {
                subject.setPlaceholder('Search...');
                const node = draw();
                assert.equal('Search...', node.placeholder);
            });
        });
    });

    describe('with type checkbox', function() {
        beforeEach(function() {
            subject = Input('checkbox');
        });

        describe('draw', function() {
            it('should draw an element with type checkbox', function() {
                const node = draw();
                assert.equal('checkbox', node.type);
            });
        });
    });
});
