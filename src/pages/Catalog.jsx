import React, { useEffect, useState } from 'react'
import SongCard from '../components/SongCard'
import { fetchSongs } from '../api/songs'

export default function Catalog({ addToCart }) {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetchSongs().then(setSongs)
  }, [])

  return (
    <div>
      <h1>Catálogo de canciones</h1>

      {songs.map(song => (
        <SongCard key={song.id} song={song} addToCart={addToCart} />
      ))}
    </div>
  )
}
