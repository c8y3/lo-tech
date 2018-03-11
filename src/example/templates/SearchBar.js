import lotech from '/lotech';

/* TODO: in this case, there should be nothing to do => only the html.tpl
   so SearchBar.html.tpl should compile automatically to the code down there:

   build each html element recursively
   return a component with the root node
*/

export default function() {
    const inStockFilter = lotech.input.Checkbox();
    const nameFilter = lotech.input.Text();
    nameFilter.setAttribute('placeholder', 'Search...');
    // or: nameFilter.setPlaceholder('Search...');
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
        addListenerOnStockFilterChanged: vue.addListenerOnChanged,
        addListenerOnNameFilterChanged: vue.addListenerOnInput
    };
};
