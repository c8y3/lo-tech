import lotech from '/lotech';
import MainHeaderRow from '/MainHeaderRow.htpl'
import ProductCategoryRow from '/ProductCategoryRow.htpl'
import ProductRow from '/ProductRow.htpl'

// TODO add this in design explanations
// templates should be simple and follow html
// accept attributes
// and a list of children

// can do injection of attributes (because attributes are either a template or a string with some templates) and of children
// start with some simple examples and increase complexity progressively

export default function() {
    const headers = MainHeaderRow();

    function buildRows(productsByCategory) {
        const rows = [headers];
        Object.keys(productsByCategory).forEach(function(category) {
            const categoryRow = ProductCategoryRow();
            categoryRow.setCategory(category);
            rows.push(categoryRow);
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
