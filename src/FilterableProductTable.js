import lotech from '/lotech/index';
import ProductTable from '/ProductTable';
import SearchBar from '/SearchBar';

export default function(products) {
    const searchBar = SearchBar();
    const productTable = ProductTable();
    productTable.setProducts(products);

    function filterProducts(inStockOnly) {
        if (!inStockOnly) {
            return products;
        }
        return products.filter(function(product) {
            return product.stocked;
        });
    }

    searchBar.addListenerOnStockFilterChanged(function(inStockOnly) {
        const filteredProducts = filterProducts(inStockOnly);
        productTable.setProducts(filteredProducts);
    });

    return lotech.Div([
        searchBar,
        productTable
    ]);
};
