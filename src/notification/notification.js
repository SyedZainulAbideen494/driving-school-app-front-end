import React from 'react';
import './notification.css';

const NotificationModal = ({ notifications, onClose }) => {
    return (
        <div className="notification-modal">
            <div className="notification-header">
                <h2>Notifications</h2>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div key={notification.id} className="notification-item">
                        <p className="created-at">{notification.created_at}</p>
                        <p className="message">{notification.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationModal;