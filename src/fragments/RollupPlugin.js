import Compiler from '/fragments/Compiler';

const compiler = Compiler();

export default function() {
    return {
        name: 'fragmentpl',
        transform(code, id) {
            if (id.slice(-5) !== '.htpl') {
                return;
            }
console.log(id);
            return compiler.compile(code);            
        }
    };
};
