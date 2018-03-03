import ProductName from './ProductName';

export default function() {
    return {
        start: function() {
            var mainComponent = ProductName();
            mainComponent.draw(document.body);
        }
    };
};
