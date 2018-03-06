import Element from './Element';

/*
 * A container is an Element with children
 */
export default function(tagName, children) {
    const node = document.createElement(tagName);
    // TODO introduce Mixin or use Object.assign
    const element = Element(node);

    return {
        draw: function(parentNode) {
            element.draw(parentNode);
            children.forEach(function(child) {
                child.draw(node);
            });
        },
        addStyle: element.addStyle
    };
};
