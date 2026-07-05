import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './routes/Home';
import Nutrition from './routes/Nutrition';
import EroorRoute from './routes/ErrorRoute';
import ServicesRoute from './pages/ServicesRoute';
import ContactsRoute from './routes/ContactsRoute';
import { CartProvider } from './context/BuyBasketcontext';
import BasketRoute from './routes/BasketRoute';
import LoginRoute from './routes/LoginRoute';
import SignUpRoute from './routes/SignUpRoute';
import AccountRoute from './routes/AccountRoute';
import { AuthContextProvider } from './context/AuthContext';
import TakingCareRoute from './routes/TakingCareRoute';
import LessTalkRoute from './routes/LessTalkRoute';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'happy-customer',
          element: <Nutrition />
        },
        {
          path: 'services',
          element: <ServicesRoute />
        },
        {
          path: 'contact',
          element: <ContactsRoute />
        },
        {
          path: '/basket',
          element: <BasketRoute />
        },
        {
          path: 'login',
          element: <LoginRoute />
        },
        {
          path: 'signup',
          element: <SignUpRoute />
        },
        {
          path: 'account',
          element: <AccountRoute />
        },
        {
          path: 'takingcare',
          element: <TakingCareRoute />
        },
        {
          path: 'lesstalk',
          element: <LessTalkRoute />
        },

        {
          path: '*',
          element: <EroorRoute />
        },
      ],
      errorElement: <EroorRoute />
    },

  ])
  return (
    <AuthContextProvider>

      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthContextProvider>

  )
}
