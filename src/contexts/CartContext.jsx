import { createContext, useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'


export const CartContext = createContext({
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    getCartTotal: () => { },
    getCartQuantity: () => { },
    clearCart: () => { }
})

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = useCallback((item) => {
        setCartItems((prevItems) => {
            const isItemInCart = prevItems.find((cartItem) => cartItem.ID === item.ID)

            if (isItemInCart) {
                return prevItems.map((cartItem) =>
                    cartItem.ID === item.ID
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            } else {
                return [...prevItems, { ...item, quantity: 1 }]
            }
        })
    }, [])

    const removeFromCart = useCallback((item) => {
        setCartItems((prevItems) => {
            const isItemInCart = prevItems.find((cartItem) => cartItem.ID === item.ID)

            if (!isItemInCart) return prevItems

            if (isItemInCart.quantity === 1) {
                return prevItems.filter((cartItem) => cartItem.ID !== item.ID)
            } else {
                return prevItems.map((cartItem) =>
                    cartItem.ID === item.ID
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            }
        })
    }, [])

    const clearCart = useCallback(() => {
        setCartItems([])
    }, [])

    const getCartTotal = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }, [cartItems])

    const getCartQuantity = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }, [cartItems])

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
        getCartQuantity,
        clearCart
    }), [cartItems, addToCart, removeFromCart, getCartTotal, getCartQuantity, clearCart])

    return (
        <CartContext.Provider
            value={value}
        >
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}