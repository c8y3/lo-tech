export default function(node) {
    return {
        draw: function(parentNode) {
            parentNode.appendChild(node);
        },
        addStyle: function(scope, name) {
            node.classList.add(scope + '__' + name);
        }
    };
};
