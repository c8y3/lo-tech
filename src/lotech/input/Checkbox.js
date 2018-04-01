import Element from '/lotech/Element';

export default function() {
    const node = document.createElement('input');
    node.type = 'checkbox';

    function getValue() {
        return node.value;
    }

    function setValue(value) {
        node.value = value;
    }

    return {
        ...Element(node),
        addListenerOnChanged(listener) {
            node.addEventListener('change', function() {
                listener(node.checked);
            });
        },
        setValue,
        getValue
    };
};
