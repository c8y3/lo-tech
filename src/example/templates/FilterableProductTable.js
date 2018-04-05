import lotech from '/lotech';
import ProductTable from '/ProductTable';
import SearchBar from '/SearchBar.htpl';
import View from '/FilterableProductTable.htpl';

export default function(products) {
    const view = View();
    const searchBar = SearchBar();
    const productTable = ProductTable();

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

    updateTable();

    view.addListenerOnStockFilterChanged(function(value) {
        inStockOnly = value;
        updateTable();
    });

    view.addListenerOnNameFilterChanged(function(value) {
        productNameFilter = value;
        updateTable();
    });

    const root = lotech.Div([
        searchBar,
        productTable
    ]);
    return lotech.Component(view);
};
