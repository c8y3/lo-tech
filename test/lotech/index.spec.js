import lotech from '/lotech/index';

describe('lotech', function() {
    describe('Form', function() {
        it('should not fail', function() {
            lotech.Form([]);
        });
    });

    describe('String', function() {
        it('should not fail', function() {
            lotech.String('Hello');
        });
    });

    describe('P', function() {
        it('should not fail', function() {
            lotech.P([]);
        });
    });

    describe('Div', function() {
        it('should not fail', function() {
            lotech.Div([]);
        });
    });

    describe('input', function() {
        describe('Text', function() {
            it('should not fail', function() {
                lotech.input.Text();
            });
        });

        describe('Checkbox', function() {
            it('should not fail', function() {
                lotech.input.Checkbox();
            });
        });
    });
});
