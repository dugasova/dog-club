import BoneYellow from './../../assets/dogs/boneyellow.svg';
import BoneWhite from './../../assets/dogs/bonewhite.svg';

type HappyCustomerProps = {
  id: number,
  name: string,
  coment: string,
  img: string,
  rating: string,
}

export default function HappyCustomerCard({ img, name, coment, rating }: HappyCustomerProps) {
  const ratingNum = parseInt(rating.split('/')[0]) || 0;
  const maaxRating = 5
  // Create array of stars
  const stars = Array.from({ length: maaxRating }).map((_, idx) => ({
    id: idx,
    filled: idx < ratingNum
  }))
  return (
    <li className='happy-customer__item'>
      <p className='happy-customer__photo'>
        <img className='happy-customer__img' src={img} alt={name} />
      </p>
      <div className='happy-customer__info'>
        <h3 className='happy-customer__name'>{name}</h3>
        <p className='happy-customer__coment'>{coment}</p>
        <p className='happy-customer__rating'>
          {
            stars.map(star => (
              <img key={star.id}
                src={star.filled ? BoneYellow : BoneWhite}
                alt="star"
                className='rating-star'
              />
            ))
          }
        </p>
      </div>
    </li>
  )
}
