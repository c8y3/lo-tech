import lotech from '/lotech/index';
import ProductCategoryRow from '/ProductCategoryRow';
import ProductRow from '/ProductRow';

export default function() {
    const scope = 'ProductTable';
    const name = lotech.Span('Name');
    name.addStyle(scope, 'name');
    const headers = lotech.Div([name, lotech.Span('Price')]);
    headers.addStyle(scope, 'headers');

    function buildRows(products) {
        let rows = [headers];
        let lastCategory;

        products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(ProductCategoryRow(product.category));
                lastCategory = product.category;
            }
            rows.push(ProductRow(product));
        });
        return rows;
    }

    const root = lotech.Div(buildRows([]));
    return {
        ...root,
        setProducts: function(products) {
            let rows = buildRows(products);
            root.setChildren(rows);
        }
    };
};
