import { createContext } from 'react'

// The "channel" that carries cart data. CartProvider puts a value in it,
// and useCart() reads that value from any component below the provider.
export const CartContext = createContext(null)
