import lotech from '/lotech/index';
import ProductTable from '/ProductTable';
import SearchBar from '/SearchBar';

export default function() {
    return lotech.Div([
        SearchBar(),
        ProductTable()
    ]);
};
