import lotech from '/lotech/index';

export default function(category) {
    const root = lotech.Div([lotech.String(category)]);
    root.addStyle('ProductCategoryRow', 'root');
    return root;
};
