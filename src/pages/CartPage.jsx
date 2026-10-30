import { Link } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import { useCart } from '../hooks/useCart.js'

function CartPage() {
  const { cart, total } = useCart()

  if (cart.length === 0) {
    return (
      <p className="muted">
        Your cart is empty. <Link to="/">Pick something from a menu</Link>{' '}
        first.
      </p>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your cart</h2>
      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem key={line.item.id} line={line} />
            ))}
          </ul>
          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        </div>
        <CheckoutForm />
      </div>
    </section>
  )
}

export default CartPage
