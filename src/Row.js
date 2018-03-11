import lotech from '/lotech/index';

export default function(content) {
    const row = lotech.Div(content);
    row.addStyle('Row', 'root');
    return row;
};
