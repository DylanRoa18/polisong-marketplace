import React, { useEffect, useState } from 'react'
import { fetchSongById, getVinylsBySong } from '../api/songs'
import { useParams } from 'react-router-dom'

export default function SongDetail({ addToCart }) {
  const { id } = useParams()
  const [song, setSong] = useState(null)
  const [vinyls, setVinyls] = useState([])

  useEffect(() => {
    fetchSongById(id).then(setSong)
    getVinylsBySong(id).then(setVinyls)
  }, [id])

  if (!song) return <p>Cargando...</p>

  return (
    <div>
      <h2>{song.title}</h2>
      <p>Artista: {song.artist}</p>
      <p>Precio: ${song.price}</p>

      <button onClick={() => addToCart({ type: 'song', item: song })}>
        Comprar canción
      </button>

      <h3>Vinilos que la incluyen:</h3>
      {vinyls.map(v => (
        <div key={v.id}>{v.title} - ${v.price}</div>
      ))}
    </div>
  )
}
