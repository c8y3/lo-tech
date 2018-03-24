export default function(node) {
    return {
        draw(parentNode) {
            parentNode.appendChild(node);
        },
// TODO remove => replace by addClass (and also have removeClass)
        addStyle(scope, name) {
            node.classList.add(scope + '__' + name);
        },
        addClass(name) {
            node.classList.add(name);
        }
    };
};
