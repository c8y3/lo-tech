import lotech from '/lotech';

const style = lotech.ScopedStyle('Row');

export default function(content) {
    const root = lotech.Div(content);
    root.addClass(style('root'));
    return lotech.Component(root);
};
