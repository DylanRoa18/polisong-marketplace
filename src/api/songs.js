import { supabase } from '../lib/supabaseClient'

export async function fetchSongs() {
  const { data, error } = await supabase.from('songs').select('*')
  if (error) throw error
  return data
}

export async function fetchSongById(id) {
  const { data, error } = await supabase.from('songs').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function getVinylsBySong(songId) {
  const { data, error } = await supabase
    .from('vinyl_songs')
    .select('vinyls(*)')
    .eq('song_id', songId)

  if (error) throw error
  return data.map(r => r.vinyls)
}
