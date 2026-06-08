import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Arrow from '../../assets/icons/arrow.svg';
import Poodle from '../../assets/dogs/whitepoodle.png';
import YellowPrint from '../../assets/dogs/yellow-print.svg';
import Dachshund from '../../assets/dogs/dachshund.png';
import PinkPrint from '../../assets/dogs/pinkprint.svg';
import PurplePrint from '../../assets/dogs/purpleprint.svg';
import './TakingCareContent.scss';

export default function TakingCareContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="takingcare-page">
      <div className="container">
        {/* back arrow */}
        <button
          className="takingcare-page__back"
          onClick={() => navigate(-1)}
          aria-label={t('common.back')}
        >
          <img src={Arrow} alt="" />
        </button>

        {/* hero */}
        <header className="takingcare-page__hero">
          <h1 className="takingcare-page__title">{t('takingcare.title')}</h1>
          <p className="takingcare-page__intro">{t('takingcare.intro')}</p>

          {/* decorative icons */}
          <div className="takingcare-page__decor">
            <img className="decor-poodle" src={Poodle} alt="" />
            <img className="decor-yellow" src={YellowPrint} alt="" />
            <img className="decor-dachshund" src={Dachshund} alt="" />
            <img className="decor-pink" src={PinkPrint} alt="" />
            <img className="decor-purple" src={PurplePrint} alt="" />

            {/* duplicates for pattern */}
            <img className="decor-poodle" src={Poodle} alt="" />
            <img className="decor-yellow" src={YellowPrint} alt="" />
            <img className="decor-dachshund" src={Dachshund} alt="" />
            <img className="decor-pink" src={PinkPrint} alt="" />
            <img className="decor-purple" src={PurplePrint} alt="" />
          </div>
        </header>

        {/* main content */}
        <article className="takingcare-page__body">
          <section>
            <h2>{t('takingcare.section1.title')}</h2>
            <p>{t('takingcare.section1.text')}</p>
          </section>

          <section>
            <h2>{t('takingcare.section2.title')}</h2>
            <p>{t('takingcare.section2.text')}</p>
          </section>

          {/* additional sections can be added here */}
        </article>
      </div>
    </div>
  );
}

