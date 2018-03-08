import Element from './Element';
import Mixin from './Mixin';

/*
 * A container is an Element with children
 */
export default function(tagName, children) {
    const node = document.createElement(tagName);
    const element = Element(node);

    return Mixin(element, {
        draw: function(parentNode) {
            element.draw(parentNode);
            children.forEach(function(child) {
                child.draw(node);
            });
        }
    });
};
