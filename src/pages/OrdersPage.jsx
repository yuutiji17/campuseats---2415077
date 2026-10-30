import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <p className="muted">
        You have no orders yet. <Link to="/">Browse the vendors</Link>.
      </p>
    )
  }

  return (
    <section>
      <h2 className="section-title">My orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <h3>Order for {order.name}</h3>
            <p className="muted">
              Placed {new Date(order.placedAt).toLocaleString()} · Mahallah{' '}
              {order.mahallah} · Pickup <time>{order.pickupTime}</time>
            </p>
            <ul>
              {order.lines.map((line) => (
                <li key={line.item.id}>
                  {line.qty} × {line.item.name}: RM{' '}
                  {(line.item.price * line.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <p className="muted">
        Demo orders only; nothing was sent to a server.
      </p>
    </section>
  )
}

export default OrdersPage
