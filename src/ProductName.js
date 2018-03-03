export default function() {
    const root = document.createTextNode('Basketball');

    return {
        draw: function(node) {
            node.appendChild(root);
        }
    };
}

