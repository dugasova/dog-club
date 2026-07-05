import { useRef, useState } from 'react';
import './ServiceSlider.scss';
import { useTranslation } from 'react-i18next';

interface ServiceItem {
  id: number;
  title: string;
  src: string;
  description: string;
}

interface Props {
  items: ServiceItem[];
  onCardClick: (description: string) => void;
}

export default function ServiceSlider({ items, onCardClick }: Props) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, clientWidth } = trackRef.current;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  const goTo = (index: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollTo({ left: index * trackRef.current.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="service-slider">
      <div className="service-slider__track" ref={trackRef} onScroll={handleScroll}>
        {items.map(({ id, title, src, description }) => (
          <div
            key={id}
            className="service-slider__card"
            onClick={() => onCardClick(t(description))}
          >
            <img className="service-slider__image" src={src} alt={title} />
            <h3 className="service-slider__title">{t(`servicecs.${title.toLowerCase()}.title`)}</h3>
          </div>
        ))}
      </div>

      <div className="service-slider__dots" role="tablist" aria-label="Slides">
        {items.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Slide ${i + 1}`}
            className={`service-slider__dot${i === activeIndex ? ' service-slider__dot--active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
