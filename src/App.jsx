import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import Products from './components/Products'
import Cart from './components/Cart'
import RootLayout from './layout/RootLayout'
import { CartProvider } from './contexts/CartContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Products /> },
      { path: "cart", element: <Cart /> }
    ],
  },
]);

function App() {

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App
