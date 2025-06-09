import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Payment from '../components/Payment'
import { useCart } from '../hooks/useCart'
import axios from 'axios'

jest.mock('axios')
jest.mock('../hooks/useCart', () => ({
    useCart: jest.fn()
}))

describe('Payment', () => {
    it('renders form inputs', () => {
        useCart.mockReturnValue({
            cartItems: [],
            clearCart: jest.fn()
        })

        render(<Payment />)

        expect(screen.getByPlaceholderText('Imię')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Nazwisko')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Numer karty')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Month (MM)')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Year (YY)')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('CVC')).toBeInTheDocument()
        expect(screen.getByText('Kupić')).toBeInTheDocument()
    })

    it('submits order', async () => {
        const clearCartMock = jest.fn()
        useCart.mockReturnValue({
            cartItems: [{ ID: 1, quantity: 1 }],
            clearCart: clearCartMock
        })

        axios.post.mockResolvedValue({ status: 200 })

        render(<Payment />)

        fireEvent.change(screen.getByPlaceholderText('Imię'), {
            target: { name: 'customerFirstName', value: 'Jakub' }
        })

        fireEvent.click(screen.getByText('Kupić'))

        await screen.findByText('Kupić')
        expect(axios.post).toHaveBeenCalled()
        expect(clearCartMock).toHaveBeenCalled()
    })
})
