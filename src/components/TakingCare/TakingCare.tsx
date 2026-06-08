import "./TakingCare.scss";
import Arrow from "../../assets/icons/arrow.svg";
import Hasky from "../../assets/dogs/hasky.jpg";
import Dog from "../../assets/dogs/dog.png";
import Poodle from "../../assets/dogs/whitepoodle.png";
import YellowPrint from "../../assets/dogs/yellow-print.svg";
import Dachshund from "../../assets/dogs/dachshund.png";
import PinkPrint from "../../assets/dogs/pinkprint.svg"
import PurplePrint from "../../assets/dogs/purpleprint.svg"
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function TakingCare() {
  const navigate = useNavigate()
  const handleToContent = () => {
    navigate('/takingcare')
  }
  const { t } = useTranslation();
  return (
    <div className='takingcare'>
      <div className='container'>
        <section className='takingcare-content'>
          <div className="takingcare-content-text">
            <div>
              <img className="takingcare-content_arrow" src={Arrow} alt="" />
            </div>
            <h1 className="takingcare-content_title">{t("takingcare.title")}</h1>
            <p className="takingcare-content_description">{t("takingcare.description")}</p>
            <button className='btn' onClick={handleToContent}>{t("takingcare.button")}</button>
            <div>
              <img className="takingcare-content_dog" src={Hasky} alt="" />
            </div>
          </div>
          <div className="takingcare-content-images">
            <div className="takingcare-images">
              <div>
                <img className="takingcare-images_dog" src={Dog} alt="Dog black" />
              </div>
              <div>
                <img className="takingcare-images_poodle" src={Poodle} alt="Dog black" />
              </div>
              <div>
                <img className="takingcare-images_yellowprint" src={YellowPrint} alt="White poodle" />
              </div>
              <div>
                <img className="takingcare-images_dachshund" src={Dachshund} alt="Dachshund" />
              </div>
              <div>
                <img className="takingcare-images_pinkprint" src={PinkPrint} alt="Pink Print of paw" />
              </div>
              <div>
                <img className="takingcare-images_purpleprint" src={PurplePrint} alt="Pink Print of paw" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
