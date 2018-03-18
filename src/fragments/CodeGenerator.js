const LOTECH_ELEMENTS = {
    div: 'Div',
    p: 'P'
};

export default function() {
    return {
        generate(htpl) {
            return 'lotech.' + LOTECH_ELEMENTS[htpl.tagName.toLowerCase()] + '([])';
        }
    };
}

