import { useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import axios from 'axios'

import plusIcon from '../assets/plus.svg'
import minusIcon from '../assets/minus.svg'


const Produkty = () => {
    const [products, setProducts] = useState([])
    const { cartItems, addToCart, removeFromCart } = useCart()
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get('http://localhost:1323/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    const getItemQuantity = (id) => {
        const item = cartItems.find(i => i.ID === id)
        return item ? item.quantity : 0
    }

    return (
        <>
            <h1 className="text-xl font-semibold mb-8">Nasze Produkty</h1>

            <ul className="grid grid-cols-4 gap-6">
                {products.map(product => {
                    const quantity = getItemQuantity(product.ID)

                    return (
                    <li key={product.ID} className="border border-primary p-2 rounded-xl">
                        <img src={`${apiUrl}/${product.image_url}`} alt={product.title} className="w-full h-auto object-cover rounded-md bg-gray-100 mb-4" />
                        <div class="flex items-center justify-between mb-4">
                            <h2 className="font-medium text-lg">{product.title}</h2>
                            <span className="text-lg font-semibold">{product.price} <span className="text-sm font-normal">zł</span></span>
                        </div>
                        {quantity > 0 ? (
                            <div className="flex items-center justify-between gap-4">
                                <button onClick={() => removeFromCart(product)} className="cursor-pointer w-10 h-10 rounded-md bg-orange-100 transition duration-200 hover:bg-primary flex items-center justify-center">
                                    <img src={minusIcon} className="w-5 relative" alt="Delete from cart" />
                                </button>
                                <span className="grow text-center">{quantity}</span>
                                <button onClick={() => addToCart(product)} className="cursor-pointer w-10 h-10 rounded-md bg-orange-100 transition duration-200 hover:bg-primary flex items-center justify-center">
                                    <img src={plusIcon} className="w-5 relative" alt="Add to cart" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="rounded-md bg-orange-100 text-primary font-medium w-full py-2 text-center cursor-pointer transition duration-200 hover:bg-primary hover:text-white"
                            >
                                Add to cart
                            </button>
                        )}
                    </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Produkty
