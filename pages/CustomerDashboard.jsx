import { useCart } from '../context/CartContext'

export default function CustomerDashboard() {
  const { cart } = useCart()

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customer Dashboard</h1>
      <p>Track your orders and manage your cart.</p>
      <div className="mt-4">
        <h2 className="font-semibold">Cart Items</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>{item.name} - ₹{item.price}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
