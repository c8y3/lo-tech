import lotech from '/lotech/index';

export default function() {
    const inStockFilter = lotech.input.Checkbox();
    const root = lotech.Form([
        lotech.input.Text('Search...'),
        lotech.P([
            inStockFilter,
            lotech.String(' Only show products in stock')
        ])
    ]);

    // TODO rather than a Mixin here (which risks propagating methods such as setChildren, should provide a Component)
    return {
        ...root,
        addListenerOnStockFilterChanged: inStockFilter.addListenerOnChanged
    };
};
