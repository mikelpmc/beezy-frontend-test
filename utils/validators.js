/**
 * Validate number
 *
 * @param {value} value
 */
const _validateNumber = value => {
    if (typeof value !== 'number' || value < 0 || value !== value) return false;

    return true;
};

/**
 * Validate string
 *
 * @param {value} value
 */
const _validateString = value => {
    if (typeof value !== 'string' || !value.trim().length) return false;

    return true;
};

module.exports = { _validateNumber, _validateString };
