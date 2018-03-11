import lotech from '/lotech/index';
import ProductRow from '/ProductRow';
import HeaderRow from '/HeaderRow';

function headersRow() {
    const scope = 'ProductTable';
    const name = lotech.Span('Name');
    name.addStyle(scope, 'name');
    const headers = HeaderRow([name, lotech.Span('Price')]);
    headers.addStyle(scope, 'headers');
    return headers;
}

function productCategoryRow(category) {
    return HeaderRow([lotech.String(category)]);
}

export default function() {
    const headers = headersRow();

    function buildRows(products) {
        const rows = [headers];
        let lastCategory;

        products.forEach(function(product) {
            if (product.category !== lastCategory) {
                rows.push(productCategoryRow(product.category));
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
            const rows = buildRows(products);
            root.setChildren(rows);
        }
    };
};
