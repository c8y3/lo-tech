import Container from '/lotech/Container';
import Component from '/lotech/Component';

export default function(children) {
    return Component(Container('span', children));
};
