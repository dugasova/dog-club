import Experts from '../components/Experts/Experts';
import HappyCustomer from '../components/HappyCustomer/HappyCustomer';
import LessTalk from '../components/LessTalk/LessTalk';
import Services from '../components/Services/Services';
import TakingCare from '../components/TakingCare/TakingCare';

export default function Home() {
  return (
    <>
      <TakingCare />
      <LessTalk />
      <Services />
      <HappyCustomer />
      <Experts />
    </>
  );
}
