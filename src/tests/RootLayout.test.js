import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import { CartContext } from '../contexts/CartContext'

describe('RootLayout', () => {
  const mockCartContext = {
    getCartQuantity: () => 3,
    getCartTotal: () => 99.99
  }

  it('renders header with navigation and cart info', () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <RootLayout />
        </BrowserRouter>
      </CartContext.Provider>
    )

    expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
    expect(screen.getByText('Produkty')).toBeInTheDocument()
    expect(screen.getByText('99.99')).toBeInTheDocument()
    expect(screen.getByText('zł')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})