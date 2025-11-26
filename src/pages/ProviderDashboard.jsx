import React, { useEffect, useState } from "react";
import { fetchProviderVinyls } from "../api/vinyls";
import { Link } from "react-router-dom";

export default function ProviderDashboard({ user }) {
  const [vinyls, setVinyls] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    async function loadVinyls() {
      const data = await fetchProviderVinyls(user.id);
      setVinyls(data);
    }

    loadVinyls();
  }, [user]);

if (!user)
  return <div className="container">Debes iniciar sesión.</div>;

  return (
    <div className="container">
      <h1>Panel de Proveedor</h1>

      {/* Botón para agregar vinilo */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-vinyl">
          <button>➕ Agregar nuevo vinilo</button>
        </Link>
      </div>

      <h2>Mis Vinilos</h2>

      {vinyls.length === 0 && <p>No tienes vinilos aún.</p>}

      <div className="vinyl-grid">
        {vinyls.map((v) => (
          <div className="vinyl-card" key={v.id}>
            <div className="vinyl-info">
              <h3>{v.title}</h3>
              <p><strong>Artista:</strong> {v.artist}</p>
              <p><strong>Año:</strong> {v.year}</p>
              <p><strong>Precio:</strong> ${v.price}</p>
              <p><strong>Inventario:</strong> {v.inventory}</p>
            </div>

            {/* Botón para ver detalles */}
            <Link to={`/vinyl/${v.id}`}>
              <button className="btn-secondary">Ver detalles</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
