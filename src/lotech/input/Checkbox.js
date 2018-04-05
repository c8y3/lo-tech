import Element from '/lotech/Element';

export default function() {
    const node = document.createElement('input');
    node.type = 'checkbox';

    // note the value of checkbox is found and set in the checked property

    return {
        ...Element(node),
        addListenerOnChanged(listener) {
            node.addEventListener('change', function() {
                listener(node.checked);
            });
        }
    };
};
