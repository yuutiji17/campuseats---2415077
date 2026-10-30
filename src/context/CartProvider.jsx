import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

// Owns the cart and past orders, and shares them with every page.
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  // Derived from the cart on every render; no separate state needed.
  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
    if (!item.available) return
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (entry) => entry.item.id === item.id,
      )
      return existingItem
        ? previousCart.map((entry) =>
            entry.item.id === item.id
              ? { ...entry, qty: entry.qty + 1 }
              : entry,
          )
        : [...previousCart, { item, qty: 1, note: '' }]
    })
  }

  function changeQty(id, delta) {
    if (delta !== -1 && delta !== 1) return
    setCart((previousCart) =>
      previousCart.map((line) =>
        line.item.id === id
          ? { ...line, qty: Math.max(1, line.qty + delta) }
          : line,
      ),
    )
  }

  function changeNote(id, note) {
    setCart((previousCart) =>
      previousCart.map((line) =>
        line.item.id === id ? { ...line, note } : line,
      ),
    )
  }

  function removeFromCart(id) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== id),
    )
  }

  function placeOrder(details) {
    if (cart.length === 0) return
    // Keep an order snapshot before clearing the cart.
    const order = {
      id: String(Date.now()),
      placedAt: new Date().toISOString(),
      ...details,
      lines: cart,
      total,
    }
    setOrders((previousOrders) => [order, ...previousOrders])
    setCart([])
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    changeNote,
    removeFromCart,
    placeOrder,
  }

  return <CartContext value={value}>{children}</CartContext>
}

export default CartProvider
