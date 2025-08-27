import { useCart } from '../context/CartContext'

export default function Home() {
  const { cart, addToCart } = useCart()

  const snacks = [
    { id: 1, name: "Traditional Ladoo", price: 120 },
    { id: 2, name: "Cultural Namkeen", price: 80 },
    { id: 3, name: "Herbal Mixture", price: 150 }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Home Lite</h1>
      <p className="mb-6 text-gray-600">Cultural Snacks in Modern Design</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {snacks.map(snack => (
          <div key={snack.id} className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold">{snack.name}</h2>
            <p className="text-gray-500">₹{snack.price}</p>
            <button 
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => addToCart(snack)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="font-bold">Cart ({cart.length})</h2>
      </div>
    </div>
  )
}
