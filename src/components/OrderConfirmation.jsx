const OrderConfirmation = ({ order }) => {
    return (
        <div className="p-6 bg-green-100 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Zamówienie złożone!</h2>
            <p><strong>Numer zamówienia:</strong> {order.ID}</p>
            <p><strong>Imię:</strong> {order.customerFirstName} {order.customerLastName}</p>
            <p><strong>Email:</strong> {order.customerEmail}</p>
            <h3 className="mt-4 font-medium">Produkty:</h3>
            <ul className="list-disc list-inside">
                {order.items.map((item, idx) => (
                    <li key={idx}>
                        Produkt ID: {item.productId}, Ilość: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderConfirmation;