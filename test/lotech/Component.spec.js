import Component from '/lotech/Component';
import Form from '/lotech/Form';

describe('lotech.Component', function() {
    let subject;

    beforeEach(function() {
        subject = Component(Form([]));
    });

    describe('draw', function() {
        it('should not fail', function() {
            const parentNode = document.createElement('div');        
            subject.draw(parentNode);
        });
    });
});
