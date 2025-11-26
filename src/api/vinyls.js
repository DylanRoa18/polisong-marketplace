import { supabase } from '../lib/supabaseClient'

export async function fetchVinyls() {
  const { data, error } = await supabase.from('vinyls').select('*')
  if (error) throw error
  return data
}

export async function fetchVinylById(id) {
  const { data, error } = await supabase.from('vinyls').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createVinyl(vinyl) {
  const { data, error } = await supabase
    .from('vinyls')
    .insert(vinyl)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchProviderVinyls(providerId) {
  const { data, error } = await supabase
    .from('vinyls')
    .select('*')
    .eq('provider_id', providerId)

  if (error) throw error
  return data
}

export async function reduceInventory(vinylId) {
  const { data: vinyl } = await supabase
    .from('vinyls')
    .select('inventory')
    .eq('id', vinylId)
    .single()

  if (!vinyl) return

  if (vinyl.inventory <= 1) {
    // Si solo queda uno → eliminar vinilo
    await supabase.from('vinyls').delete().eq('id', vinylId)
  } else {
    // Si quedan más → restar 1
    await supabase
      .from('vinyls')
      .update({ inventory: vinyl.inventory - 1 })
      .eq('id', vinylId)
  }
}
