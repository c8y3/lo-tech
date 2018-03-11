import lotech from '/lotech/index';
import Row from '/Row';

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

    function buildRows(products) {
        const rows = [headers];
        let lastCategory;

        products.forEach(function(product) {
// TODO not nice should receive an [{category: '', content: [{name:, price:}, ...]}, ...]
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
