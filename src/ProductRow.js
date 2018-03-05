import lotech from '/lotech/index';

export default function(product) {
    return lotech.Div([lotech.Span(product.name), lotech.Span(product.price)]);
};
