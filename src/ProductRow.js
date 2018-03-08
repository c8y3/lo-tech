import lotech from '/lotech/index';

export default function(product) {
    const scope = 'ProductRow';
    const name = lotech.Span(product.name);
    name.addStyle(scope, 'name');
    if (!product.stocked) {
        name.addStyle(scope, 'isMissing');
    }
    const row = lotech.Div([name, lotech.Span(product.price)]);
    row.addStyle(scope, 'root');
    return row;
};
