import React, { useEffect, useState } from 'react'
import { getVinylsBySong } from '../api/songs'

export default function SongCard({ song, addToCart }) {
  const [vinyls, setVinyls] = useState([])

  useEffect(() => {
    getVinylsBySong(song.id).then(setVinyls)
  }, [song.id])

return (
  <div>
    <h3>{song.title}</h3>
    <p><strong>Artista:</strong> {song.artist}</p>
    <p><strong>Precio:</strong> ${song.price}</p>

    <button onClick={() => addToCart({ type: 'song', item: song })}>
      Agregar al carrito
    </button>
  </div>
)

}
