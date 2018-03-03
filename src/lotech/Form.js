import Element from '/lotech/Element';

export default function(child) {
    const node = document.createElement('form');
    const element = Element(node);

    return {
        draw: function(parentNode) {
            element.draw(parentNode);
            child.draw(node);
        }
    };
};
