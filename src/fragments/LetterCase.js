function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function startsWithCapitalLetter(string) {
    const letter = string[0];
    return letter.toUpperCase() === letter;
}

export default function() {

    return {
        capitalize,
        startsWithCapitalLetter
    };
};
