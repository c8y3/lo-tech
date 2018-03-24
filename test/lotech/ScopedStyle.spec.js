import ScopedStyle from '/lotech/ScopedStyle';

describe('lotech.ScopedStyle', function() {

    it('should prefix class name with the scope', function() {
        const subject = ScopedStyle('Scope');
        const className = subject('style');
        assert.equal('Scope__style', className);
    });

});
