import lotech from '/lotech/index';
import ProductTable from '/ProductTable';
import SearchBar from '/SearchBar';

export default function(products) {
    return lotech.Div([
        SearchBar(),
        ProductTable(products)
    ]);
};
