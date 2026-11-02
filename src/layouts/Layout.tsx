import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import ContactModal from '../components/ContactModal/ContactModal';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function Layout() {
  const { t } = useTranslation();

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleContactModal = () => {
    setIsContactModalOpen((prev) => !prev);
  };

  return (
    <>
      <Header onContactUsClick={toggleContactModal} />
      <main>
        <Suspense fallback={<p role="status">{t('common.loading')}</p>}>
          <Outlet />
        </Suspense>
      </main>

      <footer>
        <Footer />
      </footer>
      <ContactModal isOpen={isContactModalOpen} onClose={toggleContactModal} />
    </>
  );
}
