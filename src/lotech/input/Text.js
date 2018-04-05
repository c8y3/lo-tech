import Element from '/lotech/Element';

// TODO remove argument of constructor (unused)
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

    function setPlaceholder(placeholder) {
        node.placeholder = placeholder;
    }

    return {
        ...Element(node),
        addListenerOnInput(listener) {
            node.addEventListener('input', function() {
                listener(node.value);
            });
        },
        setValue,
        getValue,
        setPlaceholder
    };
};
