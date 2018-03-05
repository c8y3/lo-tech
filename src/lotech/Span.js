import Element from './Element';

export default function(text) {
    const node = document.createElement('span');
    node.textContent = text;
    const element = Element(node);
    return {
        draw: element.draw,
        addStyle: function(scope, name) {
            node.classList.add(scope + '__' + name);
        }
    };
};
