import React from 'react';
import "./Modal.scss";
import Close from './../../assets/icons/closemodal.svg'

interface ModalProps {
  handleClick: () => void;
  children: React.ReactNode;
  backdropClassName?: string;
}

export default function Modal({ handleClick, children, backdropClassName }: ModalProps) {
  return (
    <div className="modal" onClick={handleClick}>
      <div className={`modal-backdrop ${backdropClassName || ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClick}>
          <img src={Close} alt="Close" />
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}