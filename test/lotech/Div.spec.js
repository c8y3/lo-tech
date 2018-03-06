import Div from '/lotech/Div';

describe('lotech.Div', function() {
    let subject;

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    describe('with no children', function() {
        beforeEach(function() {
            subject = Div([]);
        });

        describe('draw', function() {
            it('should draw an element with tagname div', function() {
                const node = draw();
                assert.equal('DIV', node.tagName);
            });
        });

        describe('addStyle', function() {
            it('should add class name to the node', function() {
                subject.addStyle('scope', 'name');
                const node = draw();
                assert.equal('scope__name', node.className);
            });
        });
    });

    describe('with 2 children', function() {
        beforeEach(function() {
            subject = Div([Div([]), Div([])]);
        });

        describe('draw', function() {
            it('should draw all children', function() {
                const node = draw();
                assert.equal(2, node.childElementCount);
            });
        });
    });
});
