import lotech from '/lotech';
import ProductCategoryRow from '/ProductCategoryRow.htpl';
import ProductRow from '/ProductRow.htpl';
import ProductTable from '/ProductTable.htpl'

// TODO add this in design explanations
// templates should be simple and follow html
// accept attributes
// and a list of children

export default function() {
    function buildRows(productsByCategory) {
        const rows = [];
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

    const view = ProductTable();
    return {
        ...lotech.Component(view),
        setProducts(products) {
            const rows = buildRows(products);
            view.setChildren(rows);
        }
    };
};
