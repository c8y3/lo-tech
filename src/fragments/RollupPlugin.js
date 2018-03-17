export default function() {
    return {
        transform(code, id) {
            console.log(code);
            console.log(id);
        }
    };
};
