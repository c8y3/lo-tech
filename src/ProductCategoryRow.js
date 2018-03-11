import lotech from '/lotech/index';
import HeaderRow from '/HeaderRow';

// TODO remove this class
export default function(category) {
    return HeaderRow([lotech.String(category)]);
};
