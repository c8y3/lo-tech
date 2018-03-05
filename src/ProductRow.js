import lotech from '/lotech/index';

export default function(product) {
    const name = lotech.Span(product.name);
    if (!product.stocked) {
        name.addStyle('ProductRow', 'isMissing');
    }
    return lotech.Div([name, lotech.Span(product.price)]);
};
