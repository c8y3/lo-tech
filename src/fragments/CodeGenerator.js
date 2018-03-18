export default function() {
    return {
        generate(htpl) {
            return 'lotech.createElement(\'' + htpl.tagName + '\', {}, [])';
        }
    };
}

