class LogicError extends Error {
    constructor(...args) {
        super(...args);
    }
}

module.exports = LogicError;
