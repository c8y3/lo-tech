export default function(tagName, style, attributes) {
    return {
        type: 'element',
        tagName,
        style,
        attributes,
        children: []
    }
}

