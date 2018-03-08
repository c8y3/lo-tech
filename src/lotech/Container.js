import Element from '/lotech/Element';

/*
 * A container is an Element with children
 */
export default function(tagName, children) {
    const node = document.createElement(tagName);
    const element = Element(node);

    function removeChildren() {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function drawChildren() {
        children.forEach(function(child) {
            child.draw(node);
        });
    }

    return {
        ...element,
        draw: function(parentNode) {
            element.draw(parentNode);
            drawChildren();
        },
        // TODO think about this, but maybe should find a way not to redraw all children 
        // => may be not efficient in the case of a Div which contains several Divs, and only one changed at the top level...
        setChildren: function(newChildren) {
            removeChildren();
            children = newChildren;
            drawChildren();
        }
    };
};
