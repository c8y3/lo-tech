import lotech from '/lotech';
import ProductCategoryRow from '/ProductCategoryRow.htpl';
import ProductRow from '/ProductRow.htpl';
import View from '/ProductTable.htpl'

function Model(view) {
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

    function setProducts(products) {
        const rows = buildRows(products);
        view.setChildren(rows);
    }

    return { setProducts };
}

export default function() {
    const view = View();
    const model = Model(view);

    return {
        ...lotech.Component(view),
        ...model
    };
};
