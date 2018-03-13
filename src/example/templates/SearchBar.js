import lotech from '/lotech';

/* TODO: could go further if the template language is extended... */

/*
for the placeholder
    nameFilter.setAttribute('placeholder', 'Search...');?
    // or: nameFilter.setPlaceholder('Search...');

*/
export default function() {
    const { root, inStockFilter, nameFilter } = Template();
/* or
    const root = Template();
    const inStockFilter = root.getElementByKey('inStockFilter');
    const nameFilter = root.getElementByKey('nameFilter');
*/

    return {
        ...lotech.Component(root),
        addListenerOnStockFilterChanged: inStockFilter.addListenerOnChanged,
        addListenerOnNameFilterChanged: nameFilter.addListenerOnInput
    };
};
