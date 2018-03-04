import lotech from '/lotech/index';
import ProductName from '/ProductName';
import SearchBar from '/SearchBar';

export default function() {
    return lotech.Div([
        SearchBar(),
        ProductName()
    ]);
};
