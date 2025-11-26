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
  <div className="container">
    <h1>Catálogo</h1>

    <h2>Canciones</h2>
    {songs.map(song => (
      <div className="card" key={song.id}>
        <SongCard song={song} addToCart={addToCart} />
      </div>
    ))}

    <h2>Vinilos</h2>
    {vinyls.map(v => (
      <div className="card" key={v.id}>
        <VinylCard vinyl={v} addToCart={addToCart} />
      </div>
    ))}
  </div>
)

}
