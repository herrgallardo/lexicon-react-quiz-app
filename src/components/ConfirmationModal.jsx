// --------------------------------------------------
// Reusable confirmation modal component for critical actions
// Displays a styled overlay with a confirmation dialog
// Includes configurable title, message, and button text
// Can be closed by clicking outside, pressing ESC, or clicking "Cancel"
// --------------------------------------------------

import React, { useEffect } from 'react';
import './ConfirmationModal.css';

/**
 * ConfirmationModal Component
 * Presents the user with a styled dialog to confirm or cancel an action
 *
 * @param {boolean} isOpen - Controls whether the modal is visible
 * @param {function} onClose - Function to call when the modal should close
 * @param {function} onConfirm - Function to call when the user confirms the action
 * @param {string} title - Title text displayed at the top of the modal
 * @param {string} message - Main message explaining what the user is confirming
 * @param {string} confirmText - Text for the confirm button (default: "Confirm")
 * @param {string} cancelText - Text for the cancel button (default: "Cancel")
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  // Effect to handle keyboard events (ESC key to close modal)
  // This improves accessibility and user experience
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Add the event listener when the component mounts or isOpen changes
    window.addEventListener('keydown', handleEscape);

    // Clean up the event listener when component unmounts or isOpen changes
    // This prevents memory leaks and duplicate handlers
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Effect to prevent scrolling on the background when modal is open
  // This ensures the user's focus stays on the modal decision
  useEffect(() => {
    if (isOpen) {
      // Disable body scrolling when modal opens
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scrolling when modal closes
      document.body.style.overflow = 'unset';
    }

    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render anything if modal is not open
  // This prevents hidden modals from affecting the DOM
  if (!isOpen) return null;

  // Prevent click from bubbling to overlay
  // This ensures clicks inside the modal don't trigger the overlay's onClick
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay backdrop - clicking anywhere on it will close the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal container - stops click propagation to prevent unwanted closes */}
      <div className="modal-container" onClick={handleModalClick}>
        <div className="modal-content">
          {/* Modal title for context */}
          <h3 className="modal-title">{title}</h3>

          {/* Detailed message explaining what user is confirming */}
          <p className="modal-message">{message}</p>

          {/* Action buttons container */}
          <div className="modal-actions">
            {/* Cancel button - returns to previous state without taking action */}
            <button className="modal-button cancel-button" onClick={onClose}>
              {cancelText}
            </button>

            {/* Confirm button - executes the confirmation action and closes modal */}
            <button
              className="modal-button confirm-button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
