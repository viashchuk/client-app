import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Produkty = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch('http://localhost:1323/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.ID}>
                        {product.title} - {product.price} PLN
                        : {product.amount}
                        <button onClick={() => addToCart(product)}>Add to cart</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Produkty;