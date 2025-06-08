// components/Modal.tsx
'use client';

import React, { useEffect, useCallback } from 'react';
import Portal from '../Portal';
import './styles.scss';
import { XIcon } from '@phosphor-icons/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  overlayClassName?: string;
  disableOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  overlayClassName,
  disableOverlayClick = true,
}) => {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey]);


  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disableOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal selector="#modal-root">
      <div
        className={`modal-overlay ${overlayClassName || ''} ${isOpen ? 'is-open' : ''}`}
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`modal ${className || 'w-11/12 max-w-md'} ${isOpen ? 'is-open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            {title && <h2 className="modal-header-title">{title}</h2>}
            <button onClick={onClose} className="modal-close-button" aria-label="Fechar modal">
              <XIcon size={24} weight="thin" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;