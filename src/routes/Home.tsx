import LessTalk from '../components/LessTalk/LessTalk'
import HappyCustomer from '../components/HappyCustomer/HappyCustomer';
import TakingCare from '../components/TakingCare/TakingCare';
import Services from '../components/Services/Services';
import Experts from '../components/Experts/Experts';

export default function Home() {
  return (
    <>
      <TakingCare />
      <LessTalk />
      <Services />
      <HappyCustomer />
      <Experts />
    </>
  )
}
