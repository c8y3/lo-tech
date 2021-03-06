import Element from '/lotech/Element';

/*
 * A container is an Element with children
 */
export default function(tagName, initialChildren) {
// TODO maybe if we have _DOMNode, no need to keep the list of children
    const children = initialChildren.slice();
    const node = document.createElement(tagName);
    const element = Element(node);

    function drawChildren() {
        children.forEach(function(child) {
            child.draw(node);
        });
    }

    drawChildren();

    function appendChild(child) {
        children.push(child);
// TODO
//        node.appendChild(child._DOMNode);
        child.draw(node);
    }

    function removeChild(child) {
        // TODO should have a map from child to their index, because this is O(N)
        const index = children.indexOf(child);
        children.splice(index, 1);
        node.removeChild(node.childNodes[index]);
    }

    function removeChildren(start) {
        children.splice(start, children.length - start);
        // TODO should not do this if called before it is drawn
        // FIXME should use childNodes, there is probably a bug here because text nodes are not in the children property => add a test
        while (node.children[start]) {
            node.removeChild(node.children[start]);
        }
    }

    function replaceChildren(start, newChildren) {
        removeChildren(start);
        children.splice(start, 0, ...newChildren);
        // TODO should not do this if called before it is drawn a first time
        drawChildren();
    }

    function setChildren(newChildren) {
        replaceChildren(0, newChildren);
    }

    function replaceChild(newChild, oldChild) {
        const index = children.indexOf(oldChild);
        children.splice(index, 1, newChild);
// TODO
//        node.replaceChild(newChild._DOMNode, oldChild._DOMNode);
        const oldChildNode = node.childNodes[index];
        newChild.draw(node, oldChildNode);
        node.removeChild(oldChildNode);
    }

    return {
        ...element,
        // TODO think about this, but maybe should find a way not to redraw all children
        // => may be not efficient in the case of a Div which contains several Divs, and only one changed at the top level...
        setChildren,

        replaceChildren,
        removeChildren,
        appendChild,
        removeChild,
        replaceChild

// TODO should have method insertBefore (more general), but would require method draw to have 2 arguments (before), to return the node and to keep track to the correspondance between lotech nodes and DOM nodes
/* TODO
insertBefore
*/
    };
};
