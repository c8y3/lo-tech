import path from 'path';
import Compiler from '/fragments/Compiler';

const extension = '.htpl'
const compiler = Compiler();

export default function() {
    return {
        name: 'fragmentpl',
        transform(code, id) {
            if (id.slice(-5) !== extension) {
                return;
            }
// TODO accept a scope_root configuration
            const scope = path.basename(id, extension);
            return compiler.compile(code, scope);            
        }
    };
};
