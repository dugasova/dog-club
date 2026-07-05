import { useState } from 'react';
import "./LessTalk.scss";
import LesstalkImage from "../../assets/lesstalk/lesstolkleft.svg";
const Pow = "/dogs/paw.svg";
import Dog from "../../assets/dogs/shetland.png";
const Arrow = '/icons/arrow.svg'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function LessTalk() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);

  const handleToLessTalkContent = () => {
    navigate('/lesstalk')
  }
  return (
    <div className='lesstalk container'>
      <div className="lesstalk-sheltland">
        <div className="lesstalk-sheltland__circle1">
          <img src={LesstalkImage} alt="" />
          <div className="lesstalk-sheltland__circle2">
            <img src={Dog} alt="sheltland dog " />
          </div>
          <div className="lesstalk-sheltland-pow_left">
            <img src={Pow} alt="print of dogs pow " />
          </div>
          <div className="lesstalk-sheltland-pow_top">
            <img src={Pow} alt="print of dogs pow " />
          </div><div className="lesstalk-sheltland-pow_right">
            <img src={Pow} alt="print of dogs pow " />
          </div>
        </div>
      </div>

      {videoOpen && (
        <div className="video-modal" onClick={() => setVideoOpen(false)}>
          <div className="video-modal__content" onClick={e => e.stopPropagation()}>
            <button className="video-modal__close" onClick={() => setVideoOpen(false)} aria-label="Close">×</button>
            <iframe
              src="https://www.youtube.com/embed/nYMRS24mATg?autoplay=1"
              title="Dog club video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <div className="lesstalk-content-block">
        <h2 className="lesstalk-title">{t("lesstalk.title")}
          <span>
            <img src={Arrow} alt="" className='lesstalk-title_arrow' />
          </span></h2>
        <p className="lesstalk-description">
          {t("lesstalk.description")}
        </p>
        <div className="lesstalk-actions">
          <button onClick={handleToLessTalkContent} className='lesstalk_btn btn'>{t("lesstalk.button")}</button>
          <button className='lesstalk-sheltland__btn play' onClick={() => setVideoOpen(true)} aria-label="Play video" />
        </div>
      </div>
    </div>
  )
}
