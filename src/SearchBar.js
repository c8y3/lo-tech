import lotech from '/lotech/index';

export default function() {
    const search = lotech.TextInput();
    return lotech.Form(search);
};
