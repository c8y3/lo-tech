import Element from '/lotech/Element';

export default function(data) {
    const node = document.createTextNode(data);
    const element = Element(node);

    return {
        ...element,
        setData(data) {
            node.data = data;
        }
    }
};
