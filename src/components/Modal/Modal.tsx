import './Modal.scss';

import { useTranslation } from 'react-i18next';

import { useEscapeKey } from '@/hooks/useEscapeKey';

const Close = '/icons/closemodal.svg';

interface ModalProps {
  handleClick: () => void;
  children: React.ReactNode;
  backdropClassName?: string;
}

export default function Modal({ handleClick, children, backdropClassName }: ModalProps) {
  useEscapeKey(handleClick);
  const { t } = useTranslation();
  return (
    <div
      className="modal"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClick();
      }}
    >
      <div className={`modal-backdrop ${backdropClassName ?? ''}`} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={handleClick} aria-label={t('common.close')}>
          <img src={Close} alt="" />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
