import { supabase } from '../lib/supabaseClient'
import { reduceInventory } from './vinyls'

export async function createOrder(buyerId, items, paymentMethod) {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0)

  // Crear orden
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      buyer_id: buyerId,
      payment_method: paymentMethod,
      total,
      status: 'completed'
    })
    .select()
    .single()

  if (error) throw error

  // Insertar ítems y procesar inventario
  for (let item of items) {
    await supabase.from('order_items').insert({
      order_id: order.id,
      song_id: item.song_id,
      vinyl_id: item.vinyl_id,
      price: item.price,
      qty: 1
    })

    // 🔥 IMPORTANTE:
    // - Canciones: NO se eliminan
    // - Vinilos: sí se gestionan
    if (item.vinyl_id) {
      await reduceInventory(item.vinyl_id)
    }
  }

  return order
}
