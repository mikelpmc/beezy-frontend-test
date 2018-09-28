import { AlertTypes } from './../constants';

export const AlertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: AlertTypes.SUCCESS, message };
}

function error(message) {
    return { type: AlertTypes.ERROR, message };
}

function clear() {
    return { type: AlertTypes.CLEAR };
}
