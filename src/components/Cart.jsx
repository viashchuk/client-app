import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

import Payment from './Payment'

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    return (
        <>
            <h1>Cart</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.ID}>
                        {item.title} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} PLN
                        <button onClick={() => removeFromCart(item)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Payment />
        </>
    );
};

export default Cart;