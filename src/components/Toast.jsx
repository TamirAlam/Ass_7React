import React from 'react';
import './Toast.css';  // Importing a separate CSS file for the toast styles

const Toast = ({ message, onClose }) => {
    return (
        <div className="toast">
            {message}
            <button onClick={onClose} className="toast-close-button">✕</button>
        </div>
    );
};

export default Toast;