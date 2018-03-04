import Div from '/lotech/Div';

describe('lotech.Div', function() {
    let node;

    function draw(children) {
        const parentNode = document.createElement('div');
        const subject = Div(children);
        subject.draw(parentNode);
        node = parentNode.firstChild;
    }

    describe('with no children', function() {
        beforeEach(function() {
            draw([]);
        });

        describe('draw', function() {
            it('should draw an element with tagname div', function() {
                assert.equal('DIV', node.tagName);
            });
        });
    });

    describe('with 2 children', function() {
        beforeEach(function() {
            draw([Div([]), Div([])]);
        });

        describe('draw', function() {
            it('should draw all children', function() {
                assert.equal(2, node.childElementCount);
            });
        });
    });
});
