import lotech from '/lotech/index';

export default function(product) {
    const name = lotech.Span(product.name);
    return lotech.Div([name, lotech.Span(product.price)]);
};
