export default function(node) {
    return {
        draw(parentNode, nextNode) {
            parentNode.insertBefore(node, nextNode);
        },
        addClass(name) {
            node.classList.add(name);
        },
        removeClass(name) {
            node.classList.remove(name);
        }
    };
};
