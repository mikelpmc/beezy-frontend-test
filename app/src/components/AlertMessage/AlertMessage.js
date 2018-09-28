import React from 'react';

const AlertMessage = ({ message, type }) => {
    return message && message.length ? (
        <div className={`notification ${type}`}>
            <strong>{message}</strong>
        </div>
    ) : null;
};

export default AlertMessage;
