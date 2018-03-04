import FilterableProductTable from '/FilterableProductTable';

export default function() {
    return {
        start: function() {
            const mainComponent = FilterableProductTable();
            mainComponent.draw(document.body);
        }
    };
};
