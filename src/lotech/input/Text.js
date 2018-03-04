import Element from '/lotech/Element';

export default function() {
    const node = document.createElement('input');
    node.type = 'text';
    const element = Element(node);

    return {
        draw: element.draw,
        setPlaceholder: function(message) {
            node.placeholder = message;
        }
    };
};
