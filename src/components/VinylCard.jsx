import React from 'react'

export default function VinylCard({ vinyl, addToCart }) {
  return (
    <div className="vinyl-card">
      <h3>{vinyl.title}</h3>
      <p>{vinyl.artist}</p>
      <p>Año: {vinyl.year}</p>
      <p>Precio: ${vinyl.price}</p>

      <button onClick={() => addToCart({ type: 'vinyl', item: vinyl })}>
        Comprar Vinilo
      </button>
    </div>
  )
}
