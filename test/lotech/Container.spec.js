import Div from '/lotech/Div';
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
                const node = draw();
                subject.setChildren([]);
            });
        });
    });
});
