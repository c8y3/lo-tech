import Element from '/lotech/Element';

/*
 * A container is an Element with children
 */
export default function(tagName, initialChildren) {
    const children = initialChildren.slice();
    const node = document.createElement(tagName);
    const element = Element(node);

    function removeChildren(start) {
        while (node.children[start]) {
            node.removeChild(node.children[start]);
        }
    }

    function drawChildren() {
        children.forEach(function(child) {
            child.draw(node);
        });
    }

    return {
        ...element,
        draw(parentNode) {
            element.draw(parentNode);
            drawChildren();
        },
        // TODO think about this, but maybe should find a way not to redraw all children
        // => may be not efficient in the case of a Div which contains several Divs, and only one changed at the top level...
        setChildren(newChildren) {
            removeChildren();
            children.splice(0, children.length, ...newChildren);
            drawChildren();
        },

        replaceChildren(start, newChildren, end) {
            removeChildren(start);
            children.splice(start, children.length, ...newChildren);
            drawChildren();
        }
    };
};
