export default function() {
    return {
        name: 'fragmentpl',
        transform(code, id) {
            console.log(code);
            console.log(id);
        }
    };
};
