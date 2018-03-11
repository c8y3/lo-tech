import lotech from '/lotech/index';

export default function(content) {
    const root = lotech.Div(content);
    root.addStyle('HeaderRow', 'root');
    return root;
};
