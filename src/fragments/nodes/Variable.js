export default function(text) {
    return {
        type: 'variable',
        name: text.substring(1, text.length-1)
    };
}

