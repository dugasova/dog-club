import { RouterProvider } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/BuyBasketContext';
import { router } from './router';

export default function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthContextProvider>
  );
}
