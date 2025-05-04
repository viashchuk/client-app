import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Products from '../components/Products'
import { useCart } from '../hooks/useCart'
import axios from 'axios'


const addToCartMock = jest.fn()

jest.mock('axios')
jest.mock('../hooks/useCart', () => ({
    useCart: jest.fn()
}))

describe('ProductsComponent', () => {
    const mockProducts = [
        {
            ID: 1,
            title: 'Kawa',
            price: 10,
            image_url: 'kawa.png',
            description: 'pyszna'
        }
    ]

    beforeEach(() => {
        jest.clearAllMocks()

        useCart.mockReturnValue({
            cartItems: [],
            addToCart: addToCartMock,
            removeFromCart: jest.fn()
        })

        axios.get.mockResolvedValue({ data: mockProducts })
    })

    it('renders product list', async () => {
        render(<Products />)

        await waitFor(() => {
            expect(screen.getByText('Kawa')).toBeInTheDocument()
            expect(screen.getByText('10')).toBeInTheDocument()
        })
    })

    it('renders button - Dodać do koszyka', async () => {
        render(<Products />)

        await waitFor(() => {
            expect(screen.getByTestId('add-to-cart')).toBeInTheDocument()
        })
    })

    it('shows empty state when products list is empty', async () => {
        axios.get.mockResolvedValue({ data: [] })
        render(<Products />)

        await waitFor(() => {
            expect(screen.getByTestId('no-products')).toBeInTheDocument()
            expect(screen.getByText('Brak produktów')).toBeInTheDocument()
        })
    })

    it('calls addToCart on click', async () => {
        render(<Products />)

        await waitFor(() => {
            const button = screen.getByTestId('add-to-cart')
            expect(button).toBeInTheDocument()
            fireEvent.click(button)
        })
        expect(addToCartMock).toHaveBeenCalledTimes(1)
        expect(addToCartMock).toHaveBeenCalledWith(
            expect.objectContaining({ ID: 1 })
        )
    })

    it('shows quantity controls when product is already in cart', async () => {
        const mockProduct = {
            ID: 1,
            title: 'Kawa',
            price: 10,
            image_url: 'kawa.png',
            description: 'pyszna'
        }

        const mockCart = {
            cartItems: [{ ID: 1, quantity: 2 }],
            addToCart: jest.fn(),
            removeFromCart: jest.fn()
        }

        useCart.mockReturnValue(mockCart)

        axios.get.mockResolvedValueOnce({ data: [mockProduct] })

        render(<Products />)


        await waitFor(() => {
            expect(screen.getByText('Kawa')).toBeInTheDocument()
        })

        expect(screen.queryByTestId('add-to-cart')).not.toBeInTheDocument()
        expect(screen.getByTestId('item-quantity-in-cart')).toHaveTextContent('2')
        expect(screen.getByTestId('add-item-to-cart')).toBeInTheDocument()
        expect(screen.getByTestId('delete-item-from-cart')).toBeInTheDocument()
    })

    it('calls removeFromCart when minus button is clicked', async () => {
        const mockProduct = {
            ID: 1,
            title: 'Kawa',
            price: 10,
            image_url: 'kawa.png',
            description: 'pyszna'
        }

        const removeFromCartMock = jest.fn()

        useCart.mockReturnValue({
            cartItems: [{ ID: 1, quantity: 3 }],
            addToCart: jest.fn(),
            removeFromCart: removeFromCartMock
        })

        axios.get.mockResolvedValueOnce({ data: [mockProduct] })

        render(<Products />)

        await waitFor(() => {
            expect(screen.getByText('Kawa')).toBeInTheDocument()
        })

        const deleteBtn = screen.getByTestId('delete-item-from-cart')
        fireEvent.click(deleteBtn)

        expect(removeFromCartMock).toHaveBeenCalledTimes(1)
        expect(removeFromCartMock).toHaveBeenCalledWith(expect.objectContaining({
            ID: 1,
            title: 'Kawa',
            price: 10
        }))
    })

    it('calls addToCart when plus button is clicked', async () => {
        const mockProduct = {
            ID: 1,
            title: 'Kawa',
            price: 10,
            image_url: 'kawa.png',
            description: 'pyszna'
        }

        const addToCartMock = jest.fn()

        useCart.mockReturnValue({
            cartItems: [{ ID: 1, quantity: 2 }],
            addToCart: addToCartMock,
            removeFromCart: jest.fn()
        })

        axios.get.mockResolvedValueOnce({ data: [mockProduct] })

        render(<Products />)

        await waitFor(() => {
            expect(screen.getByText('Kawa')).toBeInTheDocument()
        })

        const addBtn = screen.getByTestId('add-item-to-cart')
        fireEvent.click(addBtn)

        expect(addToCartMock).toHaveBeenCalledTimes(1)
        expect(addToCartMock).toHaveBeenCalledWith(expect.objectContaining({
            ID: 1,
            title: 'Kawa',
            price: 10
        }))
    })
})