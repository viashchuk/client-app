import './App.css'
import Products from './components/Products'
import Payment from './components/Payment'
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <CartProvider>
      <Products/>
      <Payment/>
    </CartProvider>
  )
}

export default App
