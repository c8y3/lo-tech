import lotech from '/lotech';
import Row from '/Row.htpl';

// TODO no need for this class, try to replace entirely by Row.htpl...

// TODO need to automatically prefix with Row__ the name
export default function(content) {
    const root = Row(content);
//    const root = lotech.Div(content);
    root.addStyle('Row', 'root');
    return lotech.Component(root);
};
