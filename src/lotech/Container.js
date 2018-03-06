import Element from './Element';

/*
 * A container is an Element with children
 */
export default function(tagName, children) {
    const node = document.createElement(tagName);
    const element = Element(node);

    // TODO introduce method Mixin
    return Object.assign({}, element, {
        draw: function(parentNode) {
            element.draw(parentNode);
            children.forEach(function(child) {
                child.draw(node);
            });
        }
    });
};
