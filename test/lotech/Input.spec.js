import Input from '/lotech/Input';

describe('lotech.Input', function() {
    let subject;
    let node;

    describe('draw', function() {
        beforeEach(function() {
            const parentNode = document.createElement('div');
            subject = Input('text');
            subject.draw(parentNode);
            node = parentNode.firstChild;
        });

        it('should draw an element with tagname input', function() {
            assert.equal('INPUT', node.tagName);
        });

        it('should draw an element with type text', function() {
            assert.equal('text', node.type);
        });
    });

    describe('with type checkbox', function() {
        beforeEach(function() {
            const parentNode = document.createElement('div');
            subject = Input('checkbox');
            subject.draw(parentNode);
            node = parentNode.firstChild;
        });

        describe('draw', function() {
            it('should draw an element with type checkbox', function() {
                assert.equal('checkbox', node.type);
            });
        });
    });
});
