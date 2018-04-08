import Element from '/fragments/nodes/Element';

export default function() {
    const root = Element('DUMMY_ROOT');
    const stack = [root];

    function getResult() {
        return root.children[0];
    }

    function appendChild(node) {
        const father = stack[stack.length-1];
        father.children.push(node);
    }

    function push(node) {
        stack.push(node);
    }

    function pop() {
        return stack.pop();
    }

    return {
        getResult,
        appendChild,
        push,
        pop
    };
}
