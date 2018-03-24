export default function(node) {
    return {
        draw(parentNode) {
            parentNode.appendChild(node);
        },
        addClass(name) {
            node.classList.add(name);
        },
        removeClass(name) {
            node.classList.remove(name);
        }
    };
};
