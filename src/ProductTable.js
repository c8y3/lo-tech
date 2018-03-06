import lotech from '/lotech/index';
import ProductCategoryRow from '/ProductCategoryRow';
import ProductRow from '/ProductRow';

export default function(products) {
    let scope = 'ProductTable';
    let name = lotech.Span('Name');
    name.addStyle(scope, 'name');
    let headers = lotech.Div([name, lotech.Span('Price')]);
    headers.addStyle(scope, 'headers');
    let rows = [headers];
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
