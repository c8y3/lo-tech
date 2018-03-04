import lotech from '/lotech/index';

export default function() {
    const searchInput = lotech.input.Text();
    searchInput.setPlaceholder('Search...');
    return lotech.Form([
        searchInput,
        lotech.P([
            lotech.input.Checkbox(),
            lotech.String(' Only show products in stock')
        ])
    ]);
};
