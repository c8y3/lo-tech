import lotech from '/lotech/index';

export default function() {
    return lotech.Form([
        lotech.Input('text'), 
        lotech.P([
            lotech.Input('checkbox'),
            lotech.String(' Only show products in stock')
        ])
    ]);
};
