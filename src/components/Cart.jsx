import { useCart } from '../hooks/useCart'

import Payment from './Payment'

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <>
            <h1 className="text-xl font-semibold mb-8">Twój koszyk</h1>
            <div className="grid grid-cols-5 gap-6">
                <Payment />
                <ul className="bg-[#EBE6F3] col-span-2 rounded-xl p-6">
                    {cartItems.map((item) => (
                        <li key={item.ID} className="bg-white p-3 rounded-md mb-4 flex items-center">
                            {item.title} × {item.quantity} = {(item.price * item.quantity).toFixed(2)} PLN
                            <button onClick={() => removeFromCart(item)} className="ml-auto bg-black text-white px-4 py-1.5 rounded-md text-sm cursor-pointer">Usunąć</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Cart;