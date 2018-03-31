import Div from '/lotech/Div';
import P from '/lotech/P';
import Container from '/lotech/Container';

describe('lotech.Container', function() {
    let subject;

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    describe('with 1 children', function() {
        beforeEach(function() {
            subject = Container('div', [Div([])]);
        });

        describe('setChildren', function() {
            it('should not fail', function() {
                draw();
                subject.setChildren([]);
            });
        });

        describe('replaceChildren', function() {
            it('should remove previous children', function() {
                const node = draw();
                subject.replaceChildren(0, []);
                assert.equal(0, node.childElementCount);
            });

            it('should replace children', function() {
                const node = draw();
                subject.replaceChildren(0, [P([])]);
                assert.equal('P', node.firstChild.tagName);
            });
        });
    });

    describe('whith 2 children', function() {
        beforeEach(function() {
            subject = Container('div', [Div([]), Div([])]);
        });

        describe('replaceChildren', function() {
            it('should remove children from the offset', function() {
                const node = draw();
                subject.replaceChildren(1, []);
                assert.equal(1, node.childElementCount);
            });

            it('should work the same when drawing later', function() {
                subject.replaceChildren(1, []);
                const node = draw();
                assert.equal(1, node.childElementCount);                
            });
        });

        describe('remove', function() {
            it('should remove child', function() {
                const node = draw();
                subject.removeChildren(1);
                assert.equal(1, node.childElementCount);
            });
        });
    });
});
