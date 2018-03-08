import Element from '/lotech/Element';

export default function() {
    const node = document.createElement('input');
    node.type = 'checkbox';

    return {
        ...Element(node),
        addListenerOnChanged: function(listener) {
            node.addEventListener('change', function() {
                listener(node.checked);
            });
        }        
    };
};
