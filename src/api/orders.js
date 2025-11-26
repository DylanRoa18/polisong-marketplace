import { supabase } from '../lib/supabaseClient'

// 🟦 Crear Orden (ya lo tienes)
export async function createOrder(buyerId, items, paymentMethod) {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0)

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

  for (let item of items) {
    await supabase.from('order_items').insert({
      order_id: order.id,
      song_id: item.song_id,
      vinyl_id: item.vinyl_id,
      price: item.price,
      qty: 1
    })
  }

  return order
}

// 🟦 Obtener compras del usuario
export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        songs (*),
        vinyls (*)
      )
    `)
    .eq('buyer_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// 🟦 Obtener ventas del proveedor
export async function getProviderSales(providerId) {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      orders (*),
      songs (*),
      vinyls (*)
    `)
    .eq('vinyls.provider_id', providerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
