import React from 'react'

export default function VinylCard({ vinyl, addToCart }) {
return (
  <div>
    <h3>{vinyl.title}</h3>
    <p><strong>Artista:</strong> {vinyl.artist}</p>
    <p><strong>Año:</strong> {vinyl.year}</p>
    <p><strong>Precio:</strong> ${vinyl.price}</p>
    <p><strong>Inventario:</strong> {vinyl.inventory}</p>

    <button onClick={() => addToCart({ type: 'vinyl', item: vinyl })}>
      Comprar Vinilo
    </button>
  </div>
)

}
