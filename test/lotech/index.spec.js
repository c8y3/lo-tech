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

    describe('Span', function() {
        it('should not fail', function() {
            lotech.Span('Hello');
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
                lotech.input.Text('Search...');
            });
        });

        describe('Checkbox', function() {
            it('should not fail', function() {
                lotech.input.Checkbox();
            });
        });
    });

    describe('Component', function() {
        it('should not fail', function() {
            lotech.Component(lotech.input.Checkbox());
        });
    });

    describe('createElement', function() {
        it('should not fail', function() {
            lotech.createElement('div', {}, []);
        });
    });
});
