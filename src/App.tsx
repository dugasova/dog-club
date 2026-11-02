import { RouterProvider } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { CartProvider } from './context/CartProvider';
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
