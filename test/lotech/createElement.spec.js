import createElement from '/lotech/createElement';

describe('lotech.createElement', function() {

    function draw(element) {
        const parentNode = document.createElement('div');
        element.draw(parentNode);
        return parentNode.firstChild;
    }

    it('should not fail', function() {
        createElement('div', {});
    });

    it('should return a drawable element', function() {
        const element = createElement('div', {});
        draw(element);
    });
});
