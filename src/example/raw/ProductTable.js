import lotech from '/lotech';
import Row from '/Row';

const scope = 'ProductTable';

function headerRow(content) {
    const row = Row(content);
    row.addStyle(scope, 'headers');
    return row;
};

function cell(content) {
    return lotech.Span([lotech.String(content)]);
}

function nameCell(name) {
    const result = cell(name);
    result.addStyle(scope, 'name');
    return result;
};

function mainHeadersRow() {
    return headerRow([nameCell('Name'), cell('Price')]);
}

function productCategoryRow(category) {
    return headerRow([lotech.String(category)]);
}

function productRow(product) {
    const name = nameCell(product.name);
    if (!product.stocked) {
        name.addStyle(scope, 'isMissing');
    }
    const price = cell(product.price);
    return Row([name, price]);
}

export default function() {
    const headers = mainHeadersRow();

    function buildRows(productsByCategory) {
        const rows = [];
        Object.keys(productsByCategory).forEach(function(category) {
            rows.push(productCategoryRow(category));
            const products = productsByCategory[category];
            products.forEach(function(product) {
                rows.push(productRow(product));
            });
        });
        return rows;
    }

    const root = lotech.Div([headers]);
    return {
        ...lotech.Component(root),
        setProducts(products) {
            const rows = buildRows(products);
            root.replaceChildren(1, rows);
        }
    };
};
