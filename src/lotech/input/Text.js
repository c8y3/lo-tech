import Element from '/lotech/Element';

export default function(placeholder) {
    const node = document.createElement('input');
    node.type = 'text';
    node.placeholder = placeholder;
    return {
        ...Element(node),
        addListenerOnInput: function(listener) {
            node.addEventListener('input', function() {
                listener(node.value);
            });
        }
    };
};
