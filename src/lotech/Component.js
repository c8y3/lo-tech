export default function(rootElement) {
    return {
        draw: rootElement.draw,
        addClass: rootElement.addClass,
        removeClass: rootElement.removeClass
    };
};
