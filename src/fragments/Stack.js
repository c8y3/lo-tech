export default function() {
    const stack = [];

    function push(node) {
        stack.push(node);
    }

    function pop() {
        return stack.pop();
    }

    function peek() {
        return stack[stack.length-1];
    }

    return {
        push,
        peek,
        pop
    };
}
