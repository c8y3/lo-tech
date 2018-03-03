export default function() {
    const root = document.createElement('form');

    return {
        draw: function(node) {
            node.appendChild(root);
        }
    };
};
