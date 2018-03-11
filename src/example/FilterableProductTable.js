import lotech from 'lotech';
import ProductTable from 'ProductTable';
import SearchBar from 'SearchBar';

export default function(products) {
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
        productTable.setProducts(filteredProducts);
    }

    updateTable();

    searchBar.addListenerOnStockFilterChanged(function(value) {
        inStockOnly = value;
        updateTable();
    });

    searchBar.addListenerOnNameFilterChanged(function(value) {
        productNameFilter = value;
        updateTable();
    });

    return lotech.Div([
        searchBar,
        productTable
    ]);
};
