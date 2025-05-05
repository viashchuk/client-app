import { useCart } from '../hooks/useCart'
import { useState } from 'react'

import Payment from './Payment'
import OrderConfirmation from './OrderConfirmation'

const Cart = () => {
    const { cartItems, removeFromCart } = useCart()
    const [order, setOrder] = useState(null)

    return (
        <>
            <h1 className="text-xl font-semibold mb-8">Twój koszyk</h1>

            {order ? (
                <OrderConfirmation order={order} />
            ) : cartItems.length === 0 ? (
                <p data-testid="no-products">Koszyk jest pusty</p>
            ) : (
                <div className="grid grid-cols-5 gap-6">
                    <Payment onOrderCreated={setOrder} />
                    <ul className="bg-[#EBE6F3] col-span-2 rounded-xl p-6">
                        {cartItems.map((item) => (
                            <li key={item.ID} className="bg-white p-3 rounded-md mb-4 flex items-center">
                                {item.title} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} zł
                                <button
                                    onClick={() => removeFromCart(item)}
                                    data-testid="delete-item-from-cart"
                                    className="ml-auto bg-black text-white px-4 py-1.5 rounded-md text-sm cursor-pointer"
                                >
                                    Usunąć
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Cart;