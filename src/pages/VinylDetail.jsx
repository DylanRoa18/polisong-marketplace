import React, { useEffect, useState } from 'react'
import { fetchVinylById } from '../api/vinyls'
import { useParams } from 'react-router-dom'

export default function VinylDetail({ addToCart }) {
  const { id } = useParams()
  const [vinyl, setVinyl] = useState(null)

  useEffect(() => {
    fetchVinylById(id).then(setVinyl)
  }, [id])

  if (!vinyl) return <p>Cargando...</p>

  return (
    <div>
      <h2>{vinyl.title}</h2>
      <p>{vinyl.artist}</p>
      <p>Precio: ${vinyl.price}</p>

      <button onClick={() => addToCart({ type: 'vinyl', item: vinyl })}>
        Comprar vinilo
      </button>
    </div>
  )
}
