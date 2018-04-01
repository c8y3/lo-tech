import Element from '/lotech/Element';

export default function(placeholder) {
    const node = document.createElement('input');
    node.type = 'text';
    node.placeholder = placeholder;

    function getValue() {
        return node.value;
    }

    function setValue(value) {
        node.value = value;
    }

    return {
        ...Element(node),
        addListenerOnInput(listener) {
            node.addEventListener('input', function() {
                listener(node.value);
            });
        },
        setValue,
        getValue
    };
};
