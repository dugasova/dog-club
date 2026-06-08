import { useState } from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import { CartProvider } from '../context/BuyBasketcontext';
import ContactModal from '../components/ContactModal/ContactModal';

export default function Layout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleContactModal = () => {
    setIsContactModalOpen(prev => !prev);
  };

  return (
    <CartProvider>
      <header>
        <Header onContactUsClick={toggleContactModal} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ContactModal isOpen={isContactModalOpen} onClose={toggleContactModal} />
    </CartProvider>
  )
}