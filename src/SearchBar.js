import lotech from '/lotech/index';

export default function() {
    return lotech.Form([
        lotech.input.Text('Search...'),
        lotech.P([
            lotech.input.Checkbox(),
            lotech.String(' Only show products in stock')
        ])
    ]);
};
