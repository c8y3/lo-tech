import lotech from '/lotech';
import View from '/FilterableProductTable.htpl';

function Model(view) {
    let products = [];
    let productNameFilter = '';
    let inStockOnly = false;

    function filterProducts() {
        const filteredProducts = products.filter(function(product) {
            if (inStockOnly && !product.stocked) {
                return false;
            }
            return product.name.includes(productNameFilter);
        });
        const result = {};
        filteredProducts.forEach(function(product) {
            result[product.category] = [];
        });
        filteredProducts.forEach(function(product) {
            const category = result[product.category];
            category.push(product);
        });
        return result;
    }

    function updateTable() {
        const filteredProducts = filterProducts();
        view.setProducts(filteredProducts);
    }

    function setFilterInStockOnly(value) {
        inStockOnly = value;
        updateTable();
    }

    function setFilterName(value) {
        productNameFilter = value;
        updateTable();
    }

    function setProducts(newProductList) {
        products = newProductList;
        updateTable();
    }

    return { setProducts, setFilterInStockOnly, setFilterName };
}

export default function(products) {
    const view = View();
    const model = Model(view);
    view.addListenerOnStockFilterChanged(model.setFilterInStockOnly);
    view.addListenerOnNameFilterChanged(model.setFilterName);
    model.setProducts(products);

    return lotech.Component(view);
};
