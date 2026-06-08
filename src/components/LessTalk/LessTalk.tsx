import "./LessTalk.scss";
import LesstalkImage from "../../assets/lesstalk/lesstolkleft.svg";
import Pow from "../../assets/dogs/paw.svg";
import Dog from "../../assets/dogs/shetland.png";
import Arrow from '../../assets/icons/arrow.svg'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function LessTalk() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        <button className='lesstalk-sheltland__btn play'></button>
      </div>
      <div className="lesstalk-content-block">
        <h2 className="lesstalk-title">{t("lesstalk.title")}
          <span>
            <img src={Arrow} alt="" className='lesstalk-title_arrow' />
          </span></h2>
        <p className="lesstalk-description">
          {t("lesstalk.description")}
        </p>
        <button onClick={handleToLessTalkContent} className='lesstalk_btn btn'>{t("lesstalk.button")}</button>
      </div>
    </div>
  )
}
