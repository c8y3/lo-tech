import Container from '/lotech/Container';

export default function(children) {
    const container = Container('div', children);

    return {
        ...container,
// TODO remove setAttributes completely
        setAttributes(attributes) {
            // TODO should be attributes.styles?
            const styles = attributes.style;
            if (styles === undefined) {
                return;
            }
            styles.forEach(function(style) {
// TODO: think about it style or class or className or other?
// TODO: think about it scope or name or module or componentName or other...
                container.addStyle(attributes.scope, style);
            });
        }
    };
};
