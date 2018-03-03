export default function(node) {
    return {
        draw: function(parentNode) {
            parentNode.appendChild(node);
        }
    };
};
