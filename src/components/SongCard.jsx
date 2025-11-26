import React, { useEffect, useState } from 'react'
import { getVinylsBySong } from '../api/songs'

export default function SongCard({ song, addToCart }) {
  const [vinyls, setVinyls] = useState([])

  useEffect(() => {
    getVinylsBySong(song.id).then(setVinyls)
  }, [song.id])

  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <p>Precio: ${song.price}</p>

      <button onClick={() => addToCart({ type: 'song', item: song })}>
        Añadir MP3 al carrito
      </button>

      {vinyls.length > 0 && (
        <>
          <h4>Vinilos que contienen esta canción:</h4>
          {vinyls.map(v => (
            <div key={v.id}>
              {v.title} - ${v.price}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
