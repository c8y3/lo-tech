export default function(element) {
    return {
        draw: element.draw,
// TODO remove
        addStyle: element.addStyle,
        addClass: element.addClass,
        removeClass: element.removeClass
    };
};
