export default function(prefix) {
    return function(style) {
        return prefix + '__' + style;
    };
};
