import lotech from '/lotech/index';
import ProductTable from '/ProductTable';
import SearchBar from '/SearchBar';

export default function(products) {
    const productTable = ProductTable();
    productTable.setProducts(products);
    return lotech.Div([
        SearchBar(),
        productTable
    ]);
};
