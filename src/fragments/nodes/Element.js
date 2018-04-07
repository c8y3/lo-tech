export default function(tagName, attributes) {
    return {
        type: 'element',
        tagName,
        attributes,
        children: []
    }
}

