import lotech from '/lotech/index';
import HeaderRow from '/HeaderRow';
import Row from '/Row';

const SCOPE = 'ProductTable';

function headersRow() {
    const name = lotech.Span('Name');
    name.addStyle(SCOPE, 'name');
    const headers = HeaderRow([name, lotech.Span('Price')]);
    headers.addStyle(SCOPE, 'headers');
    return headers;
}

function productCategoryRow(category) {
    return HeaderRow([lotech.String(category)]);
}

function productRow(product) {
    const name = lotech.Span(product.name);
    name.addStyle(SCOPE, 'name');
    if (!product.stocked) {
        name.addStyle(SCOPE, 'isMissing');
    }
    const price = lotech.Span(product.price);
    return Row([name, price]);
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
            rows.push(productRow(product));
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
