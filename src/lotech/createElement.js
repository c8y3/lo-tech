import Div from '/lotech/Div';

// TODO try to use default argument (children = []) syntax everywhere => chase all if ( === undefined)
export default function(type, attributes, children = []) {
    const element = Div(children);
    element.setAttributes(attributes);
    return element;
}
