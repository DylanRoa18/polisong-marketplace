import { supabase } from '../lib/supabaseClient'

export async function fetchVinylById(id) {
  const { data, error } = await supabase.from('vinyls').select('*').eq('id', id).single()
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

export async function createVinyl(vinyl, songIds = []) {
  const { data, error } = await supabase
    .from('vinyls')
    .insert(vinyl)
    .select()
    .single()

  if (error) throw error

  if (songIds.length) {
    const relations = songIds.map((sid, i) => ({
      vinyl_id: data.id,
      song_id: sid,
      track_number: i + 1,
    }))

    const { error: relError } = await supabase.from('vinyl_songs').insert(relations)
    if (relError) throw relError
  }

  return data
}
