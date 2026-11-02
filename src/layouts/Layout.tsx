import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import ContactModal from '../components/ContactModal/ContactModal';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Layout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleContactModal = () => {
    setIsContactModalOpen((prev) => !prev);
  };

  return (
    <>
      <Header onContactUsClick={toggleContactModal} />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ContactModal isOpen={isContactModalOpen} onClose={toggleContactModal} />
    </>
  );
}
