import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './layouts/Layout';
import ErrorRoute from './routes/ErrorRoute';
import Home from './routes/Home';
import ProtectedRoute from './routes/ProtectedRoute';

const AccountRoute = lazy(() => import('./routes/AccountRoute'));
const BasketRoute = lazy(() => import('./routes/BasketRoute'));
const ContactsRoute = lazy(() => import('./routes/ContactsRoute'));
const LessTalkRoute = lazy(() => import('./routes/LessTalkRoute'));
const LoginRoute = lazy(() => import('./routes/LoginRoute'));
const Nutrition = lazy(() => import('./routes/Nutrition'));
const ServicesRoute = lazy(() => import('./routes/ServicesRoute'));
const SignUpRoute = lazy(() => import('./routes/SignUpRoute'));
const TakingCareRoute = lazy(() => import('./routes/TakingCareRoute'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorRoute />,
    children: [
      { index: true, element: <Home /> },
      { path: 'happy-customer', element: <Nutrition /> },
      { path: 'services', element: <ServicesRoute /> },
      { path: 'contact', element: <ContactsRoute /> },
      { path: 'basket', element: <BasketRoute /> },
      { path: 'login', element: <LoginRoute /> },
      { path: 'signup', element: <SignUpRoute /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: 'account', element: <AccountRoute /> }],
      },

      { path: 'takingcare', element: <TakingCareRoute /> },
      { path: 'lesstalk', element: <LessTalkRoute /> },
      { path: '*', element: <ErrorRoute /> },
    ],
  },
]);
