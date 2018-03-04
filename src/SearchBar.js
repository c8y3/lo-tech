import lotech from '/lotech/index';

export default function() {
    const searchInput = lotech.Input('text');
    searchInput.setPlaceholder('Search...');
    return lotech.Form([
        searchInput,
        lotech.P([
            lotech.Input('checkbox'),
            lotech.String(' Only show products in stock')
        ])
    ]);
};
