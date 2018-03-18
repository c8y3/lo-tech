import Container from '/lotech/Container';

export default function(children) {
    const container = Container('div', children);

    return {
        ...container,
        setAttributes(attributes) {
// TODO: think about it style or class or className or other?
// TODO: think about it scope or name or module or componentName or other...
            container.addStyle(attributes.scope, attributes.style);
        }
    };
};
