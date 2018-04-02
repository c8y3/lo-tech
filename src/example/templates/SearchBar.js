import lotech from '/lotech';
import SearchBar from '/SearchBar.htpl';

/* TODO: could go further if the template language is extended... */

/*
for the placeholder
    nameFilter.setAttribute('placeholder', 'Search...');?
    // or: nameFilter.setPlaceholder('Search...');

*/
/*
export default function() {
    const { root, inStockFilter, nameFilter } = Template();
/ or
    const root = Template();
    const inStockFilter = root.getElementByKey('inStockFilter');
    const nameFilter = root.getElementByKey('nameFilter');
/

    return {
        ...lotech.Component(root),
        addListenerOnStockFilterChanged: inStockFilter.addListenerOnChanged,
        addListenerOnNameFilterChanged: nameFilter.addListenerOnInput
    };
};
*/

export default function() {
    const searchBar = SearchBar();
    const inStockFilter = lotech.input.Checkbox();
    const nameFilter = lotech.input.Text('Search...');
    const root = lotech.Form([
        nameFilter,
        lotech.P([
            inStockFilter,
            lotech.String(' Only show products in stock')
        ])
    ]);

    return searchBar;
/*
    return {
        ...lotech.Component(root),
        addListenerOnStockFilterChanged: inStockFilter.addListenerOnChanged,
        addListenerOnNameFilterChanged: nameFilter.addListenerOnInput
    };
*/
};
