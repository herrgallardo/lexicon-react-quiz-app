// src/components/LoginMsgModal.jsx
import React, { useEffect } from 'react';
import './LoginMsgModal.css';

function LoginMsgModal({ message, type = 'info', onClose, duration = 3000 }) {
useEffect(() => {
if (message) {
const timer = setTimeout(() => {
onClose();
}, duration);
return () => clearTimeout(timer); // Clean up on unmount
}
}, [message, duration, onClose]);

if (!message) return null;

return (
    <div className="login-msg-overlay" role="alertdialog" aria-modal="true">
      {/* Apply dynamic type class to the box */}
      {/* Use type || '' to avoid undefined className */}
      <div className={`login-msg-box \${type || ''}`}>
        {/* Optional: Add h2 here if you want a title */}
        {/* <h2>Notification</h2> */}
        {/* Use the class selector from CSS (p element inside login-msg-box) */}
        {/* Or if you prefer a dedicated class, use login-msg-text but update CSS */}
        <p className="login-msg-text">{message}</p> {/* Using login-msg-text for flexibility */}
        {/* Place the button INSIDE the actions div */}
        <div className='login-msg-box-actions'>
          {/* Use the class selector from CSS */}
          <button onClick={onClose} className="close-btn">OK</button>
        </div>
      </div>
    </div>
  );
}
export default LoginMsgModal;