import Element from '/lotech/Element';

/*
 * A container is an Element with children
 */
export default function(tagName, initialChildren) {
    const children = initialChildren.slice();
    const node = document.createElement(tagName);
    const element = Element(node);

    function removeChildren(start) {
        children.splice(start, children.length - start);
        // TODO should not do this if called before it is drawn
        while (node.children[start]) {
            node.removeChild(node.children[start]);
        }
    }

    function drawChildren() {
        children.forEach(function(child) {
            child.draw(node);
        });
    }

    function replaceChildren(start, newChildren) {
        removeChildren(start);
        children.splice(start, 0, ...newChildren);
        // TODO should not do this if called before it is drawn a first time
        drawChildren();
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
            replaceChildren(0, newChildren);
        },

        replaceChildren,

        removeChildren

// TODO should have method insertBefore (more general), but would require method draw to have 2 arguments (before), to return the node and to keep track to the correspondance between lotech nodes and DOM nodes
    };
};
