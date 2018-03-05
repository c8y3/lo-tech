import lotech from '/lotech/index';
import ProductCategoryRow from '/ProductCategoryRow';
import ProductRow from '/ProductRow';

export default function(products) {
    let rows = [lotech.Div([lotech.Span('Name'), lotech.Span('Price')])];
    let lastCategory;

    products.forEach(function(product) {
        if (product.category !== lastCategory) {
            rows.push(ProductCategoryRow(product.category));
            lastCategory = product.category;
        }
        rows.push(ProductRow(product));
    });

    return lotech.Div(rows);
};
