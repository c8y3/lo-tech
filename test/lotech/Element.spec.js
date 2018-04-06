import Element from '/lotech/Element';

describe('lotech.Element', function() {
    let parentNode;
    let subject;

    beforeEach(function() {
        parentNode = document.createElement('div');
        const node = document.createElement('span');
        subject = Element(node);
    });

    function draw() {
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

        it('should insert the element before the next node', function() {
            const nextNode = document.createElement('p');
            parentNode.appendChild(nextNode);
            subject.draw(parentNode, nextNode);
            assert.equal('SPAN', parentNode.firstChild.tagName);
        });
    });

    describe('addStyle', function() {
        it('should add class to the className of the drawn node', function() {
            const node = draw();
            subject.addStyle('scope', 'name');
            assert.equal('scope__name', node.className);
        });
    });

    describe('removeStyle', function() {
        it('should remove a class to the className of the drawn node', function() {
            const node = draw();
            subject.addStyle('scope', 'name');
            subject.removeStyle('scope', 'name');
            assert.equal('', node.className);
        });
    });
});
