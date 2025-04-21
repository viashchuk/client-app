import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Payment = () => {
    const { cartItems } = useContext(CartContext);

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

        fetch('http://localhost:1323/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Ok");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <h2>Payment</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <input name="customrFirstName" placeholder="First Name" onChange={handleChange} />
                <input name="customerLastName" placeholder="Last Name" onChange={handleChange} />
                <input name="customerEmail" placeholder="Email" onChange={handleChange} />
                <input name="cardNumber" placeholder="Card number" onChange={handleChange} />
                <input name="expiryMonth" placeholder="Month (MM)" onChange={handleChange} />
                <input name="expiryYear" placeholder="Year (YY)" onChange={handleChange} />
                <input name="cvc" placeholder="CVC" onChange={handleChange} />
                <button type="button" onClick={handleSubmit}>Buy</button>
            </form>
        </div>
    );
};

export default Payment;