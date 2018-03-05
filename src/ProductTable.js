import lotech from '/lotech/index';
import ProductRow from '/ProductRow';

export default function(products) {
    let rows = [lotech.Div([lotech.Span('Name'), lotech.Span('Price')])];

    products.forEach(function(product) {
        rows.push(ProductRow(product));
    });

    return lotech.Div(rows);
};
