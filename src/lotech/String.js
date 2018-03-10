import Element from '/lotech/Element';
// TODO rename into Text
export default function(data) {
    const node = document.createTextNode(data);

    return Element(node);
};
