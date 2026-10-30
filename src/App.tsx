import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/BuyBasketContext';
import Layout from './pages/Layout';
import ServicesRoute from './pages/ServicesRoute';
import AccountRoute from './routes/AccountRoute';
import BasketRoute from './routes/BasketRoute';
import ContactsRoute from './routes/ContactsRoute';
import ErrorRoute from './routes/ErrorRoute';
import Home from './routes/Home';
import LessTalkRoute from './routes/LessTalkRoute';
import LoginRoute from './routes/LoginRoute';
import Nutrition from './routes/Nutrition';
import SignUpRoute from './routes/SignUpRoute';
import TakingCareRoute from './routes/TakingCareRoute';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'happy-customer',
          element: <Nutrition />,
        },
        {
          path: 'services',
          element: <ServicesRoute />,
        },
        {
          path: 'contact',
          element: <ContactsRoute />,
        },
        {
          path: '/basket',
          element: <BasketRoute />,
        },
        {
          path: 'login',
          element: <LoginRoute />,
        },
        {
          path: 'signup',
          element: <SignUpRoute />,
        },
        {
          path: 'account',
          element: <AccountRoute />,
        },
        {
          path: 'takingcare',
          element: <TakingCareRoute />,
        },
        {
          path: 'lesstalk',
          element: <LessTalkRoute />,
        },

        {
          path: '*',
          element: <ErrorRoute />,
        },
      ],
      errorElement: <ErrorRoute />,
    },
  ]);
  return (
    <AuthContextProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthContextProvider>
  );
}
