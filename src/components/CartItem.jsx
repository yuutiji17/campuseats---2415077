function CartItem({ line, onChangeQty, onRemove, onChangeNote }) {
  const { item, qty, note } = line
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
      </div>
      <div className="qty">
        <button
          type="button"
          disabled={qty <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => onChangeQty(item.id, -1)}
        >
          −
        </button>
        <span>{qty}</span>
        <button
          type="button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => onChangeQty(item.id, 1)}
        >
          +
        </button>
      </div>
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
      <button
        type="button"
        className="link danger"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
      <div className="cart-note">
        <label htmlFor={`note-${item.id}`}>
          Order note for {item.name} (optional)
        </label>
        <textarea
          id={`note-${item.id}`}
          value={note}
          onChange={(event) => onChangeNote(item.id, event.target.value)}
          placeholder="For example: no onions or less sugar"
          rows={2}
        />
      </div>
    </li>
  )
}

export default CartItem
