import lotech from 'lotech';

export default function(content) {
    const row = lotech.Div(content);
    row.addStyle('Row', 'root');
    return row;
};
