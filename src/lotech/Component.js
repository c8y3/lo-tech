export default function(rootElement) {
    return {
        draw: rootElement.draw,
        addStyle: rootElement.addStyle,
        removeStyle: rootElement.removeStyle,
        addClass: rootElement.addClass,
        removeClass: rootElement.removeClass
    };
};
