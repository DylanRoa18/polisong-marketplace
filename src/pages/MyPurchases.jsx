import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api/orders";

export default function MyPurchases({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    getUserOrders(user.id).then(setOrders);
  }, [user]);

  if (!user) return <div className="container">Debes iniciar sesión.</div>

  return (
    <div className="container">
      <h1>Mis Compras</h1>

      {orders.length === 0 && <p>No tienes compras.</p>}

      {orders.map(order => (
        <div key={order.id} className="card">
          <h3>Orden #{order.id.slice(0, 6)}</h3>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Fecha:</strong> {new Date(order.created_at).toLocaleString()}</p>

          <h4>Productos:</h4>
          {order.order_items.map(item => (
            <div key={item.id}>
              {item.songs && (
                <p>🎵 Canción: {item.songs.title} — ${item.price}</p>
              )}
              {item.vinyls && (
                <p>💿 Vinilo: {item.vinyls.title} — ${item.price}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
