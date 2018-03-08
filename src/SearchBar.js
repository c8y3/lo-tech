import lotech from '/lotech/index';

export default function() {
    const inStockFilter = lotech.input.Checkbox();
    inStockFilter.addListenerOnChanged(function(e) {
        console.log(e);
    });
    return lotech.Form([
        lotech.input.Text('Search...'),
        lotech.P([
            inStockFilter,
            lotech.String(' Only show products in stock')
        ])
    ]);
};
