import lotech from 'lotech';
import Row from 'Row';

const SCOPE = 'ProductTable';

function headerRow(content) {
    const root = Row(content);
    root.addStyle(SCOPE, 'headers');
    return root;
};

function cell(content) {
    return lotech.Span(content);
}

function nameCell(name) {
    const result = cell(name);
    result.addStyle(SCOPE, 'name');
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
        name.addStyle(SCOPE, 'isMissing');
    }
    const price = cell(product.price);
    return Row([name, price]);
}

export default function() {
    const headers = mainHeadersRow();

    function buildRows(productsByCategory) {
        const rows = [headers];
        Object.keys(productsByCategory).forEach(function(category) {
            rows.push(productCategoryRow(category));
            const products = productsByCategory[category];
            products.forEach(function(product) {
                rows.push(productRow(product));
            });
        });
/* Might be easier to read?
        Object.entries(productsByCategory).forEach(function([category, products]) {
            rows.push(productCategoryRow(category));
            products.forEach(function(product) {
                rows.push(productRow(product));
            });
        });
*/
/* Might be easier to read? (needs additional buble option)
        for (const [category, products] of Object.entries(productsByCategory)) {
            rows.push(productCategoryRow(category));
            products.forEach(function(product) {
                rows.push(productRow(product));
            });
        }
*/
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
