export default function(node) {
    function addStyle(scope, name) {
        node.classList.add(scope + '__' + name);
    }

    return {
        draw(parentNode, nextNode) {
            parentNode.insertBefore(node, nextNode);
        },
        addStyle,
        addClass(name) {
            node.classList.add(name);
        },
        removeClass(name) {
            node.classList.remove(name);
        }
    };
};
