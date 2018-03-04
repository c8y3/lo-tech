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
});
