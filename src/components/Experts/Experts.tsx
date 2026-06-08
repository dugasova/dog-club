import './Experts.scss';
import WalkingDog from '../../assets/dogs/walking.png';
import ExpertsForm from './ExpertsForm';

export default function Experts() {
  return (
    <section className='experts'>
      <div className="experts-deco">
        <img src={WalkingDog} alt="dog walking" className="experts-deco-dog" />
      </div>
      <div className='container'>
        <ExpertsForm />

      </div>
    </section>
  )
}
