import Element from './Element';

export default function(type) {
    const node = document.createElement('input');
    node.type = type;
    const element = Element(node);

    return {
        draw: element.draw,
        setPlaceholder: function(message) {
            node.placeholder = message;
        }
    };
};
