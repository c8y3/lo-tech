import ProductName from './ProductName';

export default function() {
    return {
        start: function() {
            const mainComponent = ProductName();
            mainComponent.draw(document.body);
        }
    };
};
