import Container from '/lotech/Container';

export default function(children) {
    const container = Container('div', children);

    return {
        ...container,
// TODO remove setAttributes completely
        setAttributes(attributes) {
        }
    };
};
