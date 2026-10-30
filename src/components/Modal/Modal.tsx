import './Modal.scss';

import { useEscapeKey } from '../../hooks/useEscapeKey';

const Close = '/icons/closemodal.svg';

interface ModalProps {
  handleClick: () => void;
  children: React.ReactNode;
  backdropClassName?: string;
}

export default function Modal({ handleClick, children, backdropClassName }: ModalProps) {
  useEscapeKey(handleClick);
  return (
    <div
      className="modal"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClick();
      }}
    >
      <div className={`modal-backdrop ${backdropClassName ?? ''}`} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={handleClick}>
          <img src={Close} alt="Close" />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
