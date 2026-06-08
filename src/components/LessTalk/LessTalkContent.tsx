import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Arrow from '../../assets/icons/arrow.svg';
import Pow from '../../assets/dogs/paw.svg';
import Dog from '../../assets/dogs/shetland.png';
import './LessTalkContent.scss';

export default function LessTalkContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="lesstalk-page">
      <div className="container">
        {/* back arrow */}
        <button
          className="lesstalk-page__back"
          onClick={() => navigate(-1)}
          aria-label={t('common.back')}
        >
          <img src={Arrow} alt="" />
        </button>

        {/* hero */}
        <header className="lesstalk-page__hero">
          <h1 className="lesstalk-page__title">{t('lesstalk.title')}</h1>
          <p className="lesstalk-page__intro">{t('lesstalk.intro')}</p>

          {/* decorative icons from homepage */}
          <div className="lesstalk-page__decor">
            <div className="decor-circle1">
              <div className="decor-circle2">
                <img src={Dog} alt="shetland" />
              </div>
              <div className="decor-pow_left">
                <img src={Pow} alt="paw print" />
              </div>
              <div className="decor-pow_top">
                <img src={Pow} alt="paw print" />
              </div>
              <div className="decor-pow_right">
                <img src={Pow} alt="paw print" />
              </div>
            </div>
          </div>
        </header>

        {/* main content */}
        <article className="lesstalk-page__body">
          <section>
            <h2>{t('lesstalk.section1.title')}</h2>
            <p>{t('lesstalk.section1.text')}</p>
          </section>

          <section>
            <h2>{t('lesstalk.section2.title')}</h2>
            <p>{t('lesstalk.section2.text')}</p>
          </section>
        </article>
      </div>
    </div>
  );
}
