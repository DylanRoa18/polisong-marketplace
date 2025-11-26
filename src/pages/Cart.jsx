import React from 'react'
import { createOrder } from '../api/orders'

export default function Cart({ cart, setCart, user }) {
  async function checkout() {
    if (!user) return alert("Inicia sesión primero")

    const items = cart.map(c => ({
      song_id: c.type === 'song' ? c.item.id : null,
      vinyl_id: c.type === 'vinyl' ? c.item.id : null,
      price: c.item.price,
      qty: 1
    }))

    const order = await createOrder(user.id, items, "efectivo")

    alert("Orden creada: " + order.id)
    setCart([])
  }

  return (
    <div>
      <h2>Carrito</h2>

      {cart.map((c, i) => (
        <div key={i}>
          {c.type === 'song' ? "Canción" : "Vinilo"}: {c.item.title} - ${c.item.price}
        </div>
      ))}

      <button onClick={checkout}>Finalizar compra</button>
    </div>
  )
}
