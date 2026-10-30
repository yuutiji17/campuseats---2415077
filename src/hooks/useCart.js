import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

// Any component can call useCart() to read or change the shared cart.
export function useCart() {
  const context = useContext(CartContext)
  if (context === null) {
    throw new Error('useCart() must be used inside <CartProvider>.')
  }
  return context
}
