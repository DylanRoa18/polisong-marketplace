import React from 'react'
import { createOrder } from '../api/orders'
import { supabase } from '../lib/supabaseClient'

export default function Cart({ cart, setCart, user }) {
  async function checkout() {
    if (!user) return alert("Debes iniciar sesión para comprar.")

    const items = cart.map(item => ({
      song_id: item.type === 'song' ? item.item.id : null,
      vinyl_id: item.type === 'vinyl' ? item.item.id : null,
      price: item.item.price,
      qty: 1
    }))

    try {
      // Crear orden
      await createOrder(user.id, items, "efectivo")

      // NOTIFICACIÓN
      alert("Compra realizada con éxito 🎉")

      // Limpiar carrito
      setCart([])

    } catch (err) {
      console.error(err)
      alert("Ocurrió un error al procesar la compra")
    }
  }

  return (
    <div>
      <h2>Carrito</h2>

      {cart.map((c, i) => (
        <div key={i}>
          {c.type === 'song' ? "Canción" : "Vinilo"}: {c.item.title} - ${c.item.price}
        </div>
      ))}

      {cart.length === 0 && <p>No hay productos en el carrito.</p>}

      {cart.length > 0 && (
        <button onClick={checkout}>Finalizar compra</button>
      )}
    </div>
  )
}
