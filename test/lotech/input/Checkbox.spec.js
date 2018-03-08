import Checkbox from '/lotech/input/Checkbox';

describe('lotech.input.Checkbox', function() {
    let subject;

    beforeEach(function() {
        subject = Checkbox();
    });

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    describe('draw', function() {
        it('should draw an element with type checkbox', function() {
            const node = draw();
            assert.equal('checkbox', node.type);
        });
    });

    describe('addListenerOnChanged', function() {
        it('should fire when the checkbox is changed', function() {
            let called = undefined;
            // TODO do this with sinon
            const listener = function() {
                called = true;
            };
            subject.addListenerOnChanged(listener);
            const node = draw();
            node.dispatchEvent(new Event('change'));
            assert.isTrue(called);
        });

        it('should fire with the checked status', function() {
            let value = undefined;
            // TODO do this with sinon
            const listener = function(checked) {
                value = checked;
            };
            subject.addListenerOnChanged(listener);
            const node = draw();
            node.dispatchEvent(new Event('change'));
            assert.isFalse(value);
        });
    });
});
