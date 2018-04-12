export default function(node) {
    function buildClassName(scope, name) {
        return scope + '__' + name;
    }

    function draw(parentNode, nextNode) {
        if (nextNode === undefined) {
            nextNode = null;
        }
        parentNode.insertBefore(node, nextNode);
    }

    function addStyle(scope, name) {
        node.classList.add(buildClassName(scope, name));
    }

    function removeStyle(scope, name) {
        node.classList.remove(buildClassName(scope, name));
    }

    return {
        draw,
        addStyle,
        removeStyle
    };
};
