import { render, screen, fireEvent } from '@testing-library/react'
import Cart from '../components/Cart'
import { useCart } from '../hooks/useCart'

jest.mock('../hooks/useCart', () => ({
    useCart: jest.fn()
}))

describe('Cart', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders cart items', () => {
        useCart.mockReturnValue({
            cartItems: [
                { ID: 1, title: 'Espresso', quantity: 2, price: 12.5 }
            ],
            removeFromCart: jest.fn()
        })

        render(<Cart />)

        expect(screen.getByText((content) =>
            content.includes('Espresso') && content.includes('25.00')
        )).toBeInTheDocument()
        expect(screen.getByText('Usunąć')).toBeInTheDocument()
    })

    it('shows empty state when cart is empty and hides payment form', () => {
        useCart.mockReturnValue({
            cartItems: [],
            removeFromCart: jest.fn()
        })

        render(<Cart />)

        expect(screen.getByText('Koszyk jest pusty')).toBeInTheDocument()
        expect(screen.queryByText('Dane odbiorcy')).not.toBeInTheDocument()
    })

    it('calls removeFromCart when "Usunąć" button is clicked', () => {
        const removeFromCartMock = jest.fn()

        useCart.mockReturnValue({
            cartItems: [{ ID: 1, title: 'Espresso', quantity: 1, price: 12.5 }],
            removeFromCart: removeFromCartMock
        })

        render(<Cart />)

        const removeBtn = screen.getByText('Usunąć')
        fireEvent.click(removeBtn)

        expect(removeFromCartMock).toHaveBeenCalledTimes(1)
        expect(removeFromCartMock).toHaveBeenCalledWith(expect.objectContaining({ ID: 1 }))
    })
})