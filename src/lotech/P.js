import Element from './Element';

export default function(children) {
    const node = document.createElement('p');
    const element = Element(node);

    return {
        draw: function(parentNode) {
            element.draw(parentNode);
            children.forEach(function(child) {
                child.draw(node);
            });
        }
    };
};
