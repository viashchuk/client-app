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

    it('fills all fileds and submits form', async () => {
        const clearCartMock = jest.fn()

        useCart.mockReturnValue({
            cartItems: [{ ID: 1, title: 'Kawa', quantity: 2, price: 10 }],
            clearCart: clearCartMock
        })

        axios.post.mockResolvedValue({ status: 200 })

        render(<Payment />)

        fireEvent.change(screen.getByPlaceholderText('Imię'), {
            target: { name: 'customerFirstName', value: 'Anna' }
        })
        fireEvent.change(screen.getByPlaceholderText('Nazwisko'), {
            target: { name: 'customerLastName', value: 'Nowak' }
        })
        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { name: 'customerEmail', value: 'anna@example.com' }
        })
        fireEvent.change(screen.getByPlaceholderText('Numer karty'), {
            target: { name: 'cardNumber', value: '4111111111111111' }
        })
        fireEvent.change(screen.getByPlaceholderText('Month (MM)'), {
            target: { name: 'expiryMonth', value: '12' }
        })
        fireEvent.change(screen.getByPlaceholderText('Year (YY)'), {
            target: { name: 'expiryYear', value: '25' }
        })
        fireEvent.change(screen.getByPlaceholderText('CVC'), {
            target: { name: 'cvc', value: '123' }
        })

        expect(screen.getByPlaceholderText('Imię').value).toBe('Anna')
        expect(screen.getByPlaceholderText('Nazwisko').value).toBe('Nowak')
        expect(screen.getByPlaceholderText('Email').value).toBe('anna@example.com')
        expect(screen.getByPlaceholderText('Numer karty').value).toBe('4111111111111111')
        expect(screen.getByPlaceholderText('Month (MM)').value).toBe('12')
        expect(screen.getByPlaceholderText('Year (YY)').value).toBe('25')
        expect(screen.getByPlaceholderText('CVC').value).toBe('123')

        fireEvent.click(screen.getByText('Kupić'))

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled()
            expect(clearCartMock).toHaveBeenCalled()
        })

        const expectedPayload = {
            customerFirstName: 'Anna',
            customerLastName: 'Nowak',
            customerEmail: 'anna@example.com',
            cardNumber: '4111111111111111',
            expiryMonth: '12',
            expiryYear: '25',
            cvc: '123',
            items: [{ productId: 1, quantity: 2 }]
        }

        expect(axios.post).toHaveBeenCalledWith(
            expect.stringContaining('/orders'),
            expect.objectContaining(expectedPayload)
        )
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