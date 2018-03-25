// TODO try to use default argument (children = []) syntax everywhere => chase all if ( === undefined)
import Div from '/lotech/Div';

// TODO remove this class, do not use...
// TODO should remove the second argument!
export default function(type, attributes, children = []) {
    const element = Div(children);
    element.setAttributes(attributes);
    return element;
};
