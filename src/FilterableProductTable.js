import lotech from '/lotech/index';
import ProductTable from '/ProductTable';
import SearchBar from '/SearchBar';

export default function(products) {
    const searchBar = SearchBar();
    const productTable = ProductTable();
    productTable.setProducts(products);

    let productNameFilter = '';
    let inStockOnly = false;

    function filterProducts() {
        return products.filter(function(product) {
            if (inStockOnly && !product.stocked) {
                return false;
            }
            return product.name.includes(productNameFilter);
        });
    }

    function updateTable() {
        const filteredProducts = filterProducts();
        productTable.setProducts(filteredProducts);
    }

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
