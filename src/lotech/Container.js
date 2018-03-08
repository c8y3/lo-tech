import Element from './Element';
import Mixin from './Mixin';

/*
 * A container is an Element with children
 */
export default function(tagName, children) {
    const node = document.createElement(tagName);
    const element = Element(node);

    function removeChildren() {
        while (node.firstChild) {
            node.removeChild(root.firstChild);
        }
    }

    function drawChildren() {
        children.forEach(function(child) {
            child.draw(node);
        });
    }

    return Mixin(element, {
        draw: function(parentNode) {
            element.draw(parentNode);
            drawChildren();
        },
        setChildren: function(newChildren) {
            removeChildren();
            children = newChildren;
            drawChildren();
        },
    });
};
