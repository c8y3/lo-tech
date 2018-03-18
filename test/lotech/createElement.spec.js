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
    
    it('should draw children', function() {
        const element = createElement('div', {}, [createElement('div', {})]);
        const node = draw(element);
        assert.equal(1, node.childElementCount);
    });
});
