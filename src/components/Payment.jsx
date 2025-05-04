import { useState } from 'react';
import { useCart } from '../hooks/useCart'
import axios from 'axios';

const Payment = () => {
    const { cartItems, clearCart } = useCart();

    const [formData, setFormData] = useState({
        customerFirstName: '',
        customerLastName: '',
        customerEmail: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const order = {
            ...formData,
            items: cartItems.map((item) => ({
                productId: item.id || item.ID,
                quantity: item.quantity,
            }))
        };

        axios.post('http://localhost:1323/orders', order)
        .then(res => { clearCart(); })
        .catch(err => console.error(err));
    };

    return (
        <div className="col-span-3">
            <h2 className="text-lg font-semibold mb-8">Dane odbiorcy</h2>

            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-6">
                <div>
                    <label htmlFor="customrFirstName" className="font-medium text-[#484545] mb-2 block">Imię</label>
                    <input name="customrFirstName" id="customrFirstName" placeholder="Imię" onChange={handleChange} className="form-input" />
                </div>
                <div>
                    <label htmlFor="customerLastName" className="font-medium text-[#484545] mb-2 block">Nazwisko</label>
                    <input name="customerLastName" id="customerLastName" placeholder="Nazwisko" onChange={handleChange} className="form-input" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="customerEmail" className="font-medium text-[#484545] mb-2 block">Email</label>
                    <input name="customerEmail" id="customerEmail" placeholder="Email" onChange={handleChange} className="form-input" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="cardNumber" className="font-medium text-[#484545] mb-2 block">Dane karty</label>
                    <div className="flex gap-3">
                        <input name="cardNumber" id="cardNumber" placeholder="Numer karty" onChange={handleChange} className="form-input" />
                        <input name="expiryMonth" placeholder="Month (MM)" onChange={handleChange} className="form-input" />
                        <input name="expiryYear" placeholder="Year (YY)" onChange={handleChange} className="form-input" />
                        <input name="cvc" placeholder="CVC" onChange={handleChange} className="form-input" />
                    </div>
                </div>
                <button type="button"
                        onClick={handleSubmit}                  
                        className="col-span-2 rounded-xl bg-primary text-white font-medium w-full py-3 text-center cursor-pointer transition duration-200 hover:bg-primary hover:text-white">
                            Kupić
                </button>
            </form>
        </div>
    );
};

export default Payment;