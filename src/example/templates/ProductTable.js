import lotech from '/lotech';
import Row from '/Row';

// templates should be simple and follow html
// accept attributes
// and a list of children

// can do injection of attributes (because attributes are either a template or a string with some templates) and of children
// getElementByKey does not work in sub-trees (just one level)
// start with some simple examples and increase complexity progressively

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
// this one would be done after in code (not in the templates) => no do the injection in the template {isMissing}
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

    const root = lotech.Div([headers]);
    return {
        ...lotech.Component(root),
        setProducts: function(products) {
            const rows = buildRows(products);
            root.replaceChildren(1, rows);
        }
    };
};
