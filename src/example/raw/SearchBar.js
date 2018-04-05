import lotech from '/lotech';

export default function() {
    const inStockFilter = lotech.input.Checkbox();
    const nameFilter = lotech.input.Text();
    nameFilter.setPlaceholder('Search...');
    const root = lotech.Form([
        nameFilter,
        lotech.P([
            inStockFilter,
            lotech.String('Only show products in stock')
        ])
    ]);

    return {
        ...lotech.Component(root),
        addListenerOnStockFilterChanged: inStockFilter.addListenerOnChanged,
        addListenerOnNameFilterChanged: nameFilter.addListenerOnInput
    };
};
