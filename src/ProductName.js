function ProductName() {
    var root = document.createTextNode('Basketball');

    return {
        draw: function(node) {
            node.appendChild(root);
        }
    };
}

