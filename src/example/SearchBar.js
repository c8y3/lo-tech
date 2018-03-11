import lotech from '/lotech';

export default function() {
    const inStockFilter = lotech.input.Checkbox();
    const nameFilter = lotech.input.Text('Search...');
    const root = lotech.Form([
        nameFilter,
        lotech.P([
            inStockFilter,
            lotech.String(' Only show products in stock')
        ])
    ]);

    // TODO rather than a Mixin here (which risks propagating methods such as setChildren, should use a Component, and also everywhere else a component is built)
    return {
        ...root,
        addListenerOnStockFilterChanged: inStockFilter.addListenerOnChanged,
        addListenerOnNameFilterChanged: nameFilter.addListenerOnInput
    };
};
