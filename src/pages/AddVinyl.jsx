import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { createVinyl } from '../api/vinyls'

export default function AddVinyl() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [inventory, setInventory] = useState(1)
  const [message, setMessage] = useState('')

  async function save() {
    const { data: userData } = await supabase.auth.getUser()
    const providerId = userData.user?.id

    if (!providerId) {
      setMessage("Debes iniciar sesión como proveedor.")
      return
    }

    const vinyl = {
      title,
      artist,
      year: Number(year),
      price: Number(price),
      inventory: Number(inventory),
      provider_id: providerId
    }

    try {
      await createVinyl(vinyl)
      setMessage("Vinilo agregado correctamente.")
    } catch (err) {
      setMessage(err.message)
    }
  }

return (
  <div className="container">
    <h1>Agregar Vinilo</h1>

    <form>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Artista" value={artist} onChange={e => setArtist(e.target.value)} />
      <input placeholder="Año" value={year} onChange={e => setYear(e.target.value)} />
      <input placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Inventario" value={inventory} onChange={e => setInventory(e.target.value)} />

      <button type="button" onClick={save}>Guardar</button>

      {message && <p className="alert">{message}</p>}
    </form>
  </div>
)

}
