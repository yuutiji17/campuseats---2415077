import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import CartPage from './components/CartPage.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import { validateVendors } from './utils/validateVendors.js'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [order, setOrder] = useState(null)
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId,
  )

  useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      try {
        const res = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}.`)
        }

        const data = await res.json()
        // Ignore results if this effect has already been cleaned up.
        if (controller.signal.aborted) return

        validateVendors(data)
        setVendors(data)
        setSelectedVendorId(data[0]?.id ?? null)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Could not load vendors. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchVendors()
    return () => controller.abort()
  }, [reloadKey])

  function handleRetry() {
    setLoading(true)
    setError(null)
    setReloadKey((previousKey) => previousKey + 1)
  }

  function handleAddToCart(item) {
    if (!selectedVendor?.isOpen || !item.available) return
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

  function handleChangeQty(id, delta) {
    if (delta !== -1 && delta !== 1) return
    setCart((previousCart) =>
      previousCart.map((line) =>
        line.item.id === id
          ? { ...line, qty: Math.max(1, line.qty + delta) }
          : line,
      ),
    )
  }

  function handleChangeNote(id, note) {
    setCart((previousCart) =>
      previousCart.map((line) =>
        line.item.id === id ? { ...line, note } : line,
      ),
    )
  }

  function handleRemove(id) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== id),
    )
  }

  function handlePlaceOrder(values) {
    if (cart.length === 0) return
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0,
    )
    // Keep an order snapshot before clearing the cart.
    setOrder({ ...values, lines: cart, total })
    setCart([])
    setView('done')
  }

  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onChangeNote={handleChangeNote}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <section className="card" role="status">
        <h2>Order placed</h2>
        <p>Thank you, {order.name}!</p>
        <p>Mahallah: {order.mahallah}</p>
        <p>
          Pickup time: <time>{order.pickupTime}</time>
        </p>
        <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
        <p className="muted">
          Demo confirmation; no order was sent to a server.
        </p>
      </section>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />
  } else if (vendors.length === 0) {
    content = <p className="muted">No vendors available yet.</p>
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>
        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
              isVendorOpen={selectedVendor.isOpen}
            />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App
