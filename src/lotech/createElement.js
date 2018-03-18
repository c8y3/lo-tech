import Div from '/lotech/Div';

// TODO try to use default argument (children = []) syntax everywhere => chase all if ( === undefined)
export default function(name, attributes, children = []) {
    return Div(children);
}
