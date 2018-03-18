export default function(node) {
    return {
        draw(parentNode) {
            parentNode.appendChild(node);
        },
        addStyle(scope, name) {
            node.classList.add(scope + '__' + name);
        }
    };
};
