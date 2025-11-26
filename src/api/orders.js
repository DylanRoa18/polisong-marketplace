import { supabase } from '../lib/supabaseClient'

export async function createOrder(buyerId, items, paymentMethod) {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0)

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      buyer_id: buyerId,
      payment_method: paymentMethod,
      total,
      status: 'open'
    })
    .select()
    .single()

  if (error) throw error

  const formatted = items.map(i => ({
    order_id: order.id,
    song_id: i.song_id ?? null,
    vinyl_id: i.vinyl_id ?? null,
    qty: i.qty,
    price: i.price
  }))

  const { error: itemsErr } = await supabase.from('order_items').insert(formatted)
  if (itemsErr) throw itemsErr

  return order
}
