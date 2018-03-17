import Compiler from '/fragments/Compiler';

const compiler = Compiler();

export default function() {
    return {
        name: 'fragmentpl',
        transform(code, id) {
            console.log(code);
            console.log(id);
            return compiler.compile(code);            
        }
    };
};
