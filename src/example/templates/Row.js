import lotech from '/lotech';

// TODO need to automatically prefix with Row__ the name
export default function(content) {
    const root = Template();
    return lotech.Component(root);
};
