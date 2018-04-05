import Element from '/lotech/Element';

// TODO remove argument of constructor (unused)
export default function() {
    const node = document.createElement('input');
    node.type = 'text';

    function getValue() {
        return node.value;
    }

    function setValue(value) {
        node.value = value;
    }

    function setPlaceholder(placeholder) {
        node.placeholder = placeholder;
    }

    function addListenerOnInput(listener) {
        node.addEventListener('input', function() {
            listener(node.value);
        });
    }

    return {
        ...Element(node),
        addListenerOnInput,
        setValue,
        getValue,
        setPlaceholder
    };
};
