import Row from '/Row';

// setAttribute (or just the attribute name + a Proxy?)
<Row>
    <span class="name {isMissing}">{Name}</span>
    <span>{Price}</span>
</Row>
// should compile to
import lotech from '/lotech';
import Row from '/Row';

const SCOPE = 'ProductRow';

export default function(attributes) {
    const name = lotech.Span([lotech.String(attributes.Name)])
    name.addStyle(SCOPE, name);
    if (attributes.isMissing !== undefined) {
        name.addStyle(SCOPE, attributes.isMissing);
    }
    return Row([
        lotech.Span(),
        lotech.Span([lotech.String(attributes.Price)])
    ]);
};
