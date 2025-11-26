import React, { useEffect, useState } from "react";
import { getProviderSales } from "../api/orders";

export default function MySales({ user }) {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!user?.is_provider) return;

    getProviderSales(user.id).then(setSales);
  }, [user]);

  if (!user) return <div className="container">Debes iniciar sesión.</div>;
  if (!user.is_provider) return <div className="container">No eres proveedor.</div>;

  return (
    <div className="container">
      <h1>Mis Ventas</h1>

      {sales.length === 0 && <p>No tienes ventas aún.</p>}

      {sales.map(item => (
        <div key={item.id} className="card">
          <h3>Venta #{item.id.slice(0, 6)}</h3>

          <p>
            <strong>Comprador:</strong> {item.orders?.buyer_id}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(item.created_at).toLocaleString()}
          </p>

          {item.songs && (
            <p>🎵 Canción: {item.songs.title} — ${item.price}</p>
          )}

          {item.vinyls && (
            <p>💿 Vinilo: {item.vinyls.title} — ${item.price}</p>
          )}
        </div>
      ))}
    </div>
  );
}
