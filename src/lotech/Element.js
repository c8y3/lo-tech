export default function(node) {
    function draw(parentNode, nextNode) {
        parentNode.insertBefore(node, nextNode);
    }

    function addStyle(scope, name) {
        node.classList.add(scope + '__' + name);
    }

    return {
        draw,
        addStyle,
        addClass(name) {
            node.classList.add(name);
        },
        removeClass(name) {
            node.classList.remove(name);
        }
    };
};
