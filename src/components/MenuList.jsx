import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items, isVendorOpen }) {
  const { addToCart } = useCart()

  function handleAdd(item) {
    if (isVendorOpen) addToCart(item)
  }

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={handleAdd}
          isVendorOpen={isVendorOpen}
        />
      ))}
    </div>
  )
}

export default MenuList
