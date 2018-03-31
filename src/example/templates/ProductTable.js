import lotech from '/lotech';
import Row from '/Row.htpl';
import HeaderRow from '/HeaderRow.htpl'
import ProductRow from '/ProductRow.htpl'

// templates should be simple and follow html
// accept attributes
// and a list of children

// can do injection of attributes (because attributes are either a template or a string with some templates) and of children
// getElementByKey does not work in sub-trees (just one level)
// start with some simple examples and increase complexity progressively

const style = lotech.ScopedStyle('ProductTable');

function headerRow(children) {
    const root = Row(children);
    root.addClass(style('headers'));
    return root;
};

function cell(content) {
    return lotech.Span([lotech.String(content)]);
}

function nameCell(name) {
    const result = cell(name);
    result.addClass(style('name'));
    return result;
};

function mainHeadersRow() {
    return headerRow([nameCell('Name'), cell('Price')]);
}

function productCategoryRow(category) {
    return HeaderRow([lotech.String(category)]);
}

export default function() {
    const headers = mainHeadersRow();

    function buildRows(productsByCategory) {
        const rows = [headers];
        Object.keys(productsByCategory).forEach(function(category) {
            rows.push(productCategoryRow(category));
            const products = productsByCategory[category];
            products.forEach(function(product) {
                const row = ProductRow();
                row.setName(product.name);
                row.setPrice(product.price);
                row.setIsMissing(!product.stocked);
                rows.push(row);
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
