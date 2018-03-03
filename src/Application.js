import ProductName from '/ProductName';
import SearchBar from '/SearchBar';

export default function() {
    return {
        start: function() {
            const mainComponent = ProductName();
            SearchBar().draw(document.body);
            mainComponent.draw(document.body);
        }
    };
};
