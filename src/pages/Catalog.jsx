import React, { useEffect, useState } from 'react'
import { fetchSongs } from '../api/songs'
import { fetchVinyls } from '../api/vinyls'
import SongCard from '../components/SongCard'
import VinylCard from '../components/VinylCard'

export default function Catalog({ addToCart }) {
  const [songs, setSongs] = useState([])
  const [vinyls, setVinyls] = useState([])

  useEffect(() => {
    fetchSongs().then(setSongs)
    fetchVinyls().then(setVinyls)
  }, [])

  return (
    <div>
      <h1>Catálogo</h1>

      <h2>Canciones</h2>
      {songs.map(song => (
        <SongCard key={song.id} song={song} addToCart={addToCart} />
      ))}

      <h2>Vinilos</h2>
      {vinyls.map(v => (
        <VinylCard key={v.id} vinyl={v} addToCart={addToCart} />
      ))}
    </div>
  )
}
