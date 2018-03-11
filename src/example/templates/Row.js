import lotech from '/lotech';

export default function(content) {
    const root = lotech.Div(content);
    root.addStyle('Row', 'root');
    return lotech.Component(root);
};
