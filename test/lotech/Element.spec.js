import Element from '/lotech/Element';

describe('lotech.Element', function() {
    let subject;

    beforeEach(function() {
        const node = document.createElement('span');
        subject = Element(node);
    });

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    };

    describe('draw', function() {
        it('should not fail', function() {
            draw();
        });

        it('should append the element node to the parent node', function() {
            const node = draw();
            assert.equal('SPAN', node.tagName);
        });
    });

    describe('addClass', function() {
        it('should add class to the className of the drawn node', function() {
            const node = draw();
            subject.addClass('some__class');
            assert.equal('some__class', node.className);
        });
    });
});
