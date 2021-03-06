import Div from '/lotech/Div';
import P from '/lotech/P';
import String from '/lotech/String';
import Container from '/lotech/Container';

describe('lotech.Container', function() {
    let subject;

    function draw() {
        const parentNode = document.createElement('div');
        subject.draw(parentNode);
        return parentNode.firstChild;
    }

    describe('with no child', function() {
        beforeEach(function() {
            subject = Container('div', []);
        });
    
        describe('removeChild', function() {
            it('should remove text children too', function() {
                const node = draw();
                const child = String('Hello');
                subject.appendChild(child);
                subject.removeChild(child);
                assert.equal(0, node.childNodes.length);
            });
        });
    });

    describe('with 1 children', function() {
        let child;

        beforeEach(function() {
            child = Div([]);
            subject = Container('div', [child]);
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
                assert.equal(0, node.childNodes.length);
            });

            it('should replace children', function() {
                const node = draw();
                subject.replaceChildren(0, [P([])]);
                assert.equal('P', node.firstChild.tagName);
            });
        });

        describe('replaceChild', function() {
            it('should replace children', function() {
                const node = draw();
                subject.replaceChild(P([]), child);
                assert.equal('P', node.firstChild.tagName);
            });
        });

        describe('appendChild', function() {
            it('should add the child in the last position', function() {
                const node = draw();
                subject.appendChild(P([]));
                assert.equal('P', node.lastChild.tagName);
            });
        });

        describe('removeChild', function() {
            it('should remove this child', function() {
                const node = draw();
                subject.removeChild(child);
                assert.equal(0, node.childNodes.length);
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
                assert.equal(1, node.childNodes.length);
            });

            it('should work the same when drawing later', function() {
                subject.replaceChildren(1, []);
                const node = draw();
                assert.equal(1, node.childNodes.length);                
            });
        });

        describe('remove', function() {
            it('should remove child', function() {
                const node = draw();
                subject.removeChildren(1);
                assert.equal(1, node.childNodes.length);
            });
        });
    });
});
