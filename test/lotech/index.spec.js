import lotech from '/lotech/index';

describe('lotech', function() {
    describe('Form', function() {
        it('should not fail', function() {
            lotech.Form();
        });
    });

    describe('String', function() {
        it('should not fail', function() {
            lotech.String('Hello');
        });
    });

    describe('TextInput', function() {
        it('should not fail', function() {
            lotech.TextInput();
        });
    });
});
