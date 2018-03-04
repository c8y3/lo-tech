import Element from './Element';

export default function(data) {
    const node = document.createTextNode(data);

    return Element(node);
};
