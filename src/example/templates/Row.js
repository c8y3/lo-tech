import lotech from '/lotech';
import Row from 'Row.html.tpl';

// TODO no need for this class, remove...

// TODO need to automatically prefix with Row__ the name
export default function(children) {
    return Row({}, children);
};
